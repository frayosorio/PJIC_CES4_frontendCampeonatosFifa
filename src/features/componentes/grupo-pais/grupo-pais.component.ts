import { Component, Inject } from '@angular/core';
import { GrupoPais } from '../../../shared/entidades/grupo-pais';
import { Seleccion } from '../../../shared/entidades/seleccion';
import { Grupo } from '../../../shared/entidades/grupo';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { GrupoService } from '../../../core/servicios/grupo.service';
import { DecidirComponent } from '../../../shared/componentes/decidir/decidir.component';

export interface DatosGrupoPais {
  encabezado: string;
  seleccionesGrupo: GrupoPais[];
  selecciones: Seleccion[];
  grupo: Grupo;
}


@Component({
  selector: 'app-grupo-pais',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule,
    NgFor
  ],
  templateUrl: './grupo-pais.component.html',
  styleUrl: './grupo-pais.component.css'
})
export class GrupoPaisComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosGrupoPais,
    private grupoServicio: GrupoService,
    public dialogoServicio: MatDialog,) {

  }

  public columnas = [
    { name: "Selección", prop: "pais.nombre" }
  ]
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  public seleccionEscogida: Seleccion | undefined;

  public seleccionGrupoEscogida: GrupoPais | undefined;


  escoger(event: any) {
    if (event.type == "click") {
      this.seleccionGrupoEscogida = event.row;
    }
  }

  eliminar() {
    if (this.seleccionGrupoEscogida) {
      const cuadroDialogo = this.dialogoServicio.open(DecidirComponent, {
        width: "300px",
        height: "200px",
        data: {
          encabezado: `Está seguro de eliminar la selección [${this.seleccionGrupoEscogida.pais.nombre}] del Grupo ?`,
          id: this.seleccionGrupoEscogida.pais.id,
        },
        disableClose: true,
      });

      cuadroDialogo.afterClosed().subscribe({
        next: (datos) => {
          if (datos) {
            this.grupoServicio.eliminarPais(this.datos.grupo.id, datos.id).subscribe({
              next: (response) => {
                this.datos.seleccionesGrupo=this.datos.seleccionesGrupo.filter(sg=> sg.pais.id != this.seleccionGrupoEscogida?.pais.id);
                this.seleccionGrupoEscogida = undefined;
                window.alert("La selección fue retirada");
              },
              error: (error) => {
                window.alert(error.message);
              }
            });
          }
        }
      });
    }
  }

  agregar() {
    if (this.seleccionEscogida) {
      this.grupoServicio.agregarPais({
        grupo: this.datos.grupo,
        pais: this.seleccionEscogida
      }).subscribe({
        next: (response) => {
          this.datos.seleccionesGrupo = [...this.datos.seleccionesGrupo, response];
          this.seleccionEscogida = undefined;
        }
        , error: (error) => {
          window.alert(error.message);
        }
      });
    }
  }

}
