import { Component, Inject } from '@angular/core';
import { GrupoPais } from '../../../shared/entidades/grupo-pais';
import { Seleccion } from '../../../shared/entidades/seleccion';
import { Grupo } from '../../../shared/entidades/grupo';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';

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
    NgxDatatableModule
  ],
  templateUrl: './grupo-pais.component.html',
  styleUrl: './grupo-pais.component.css'
})
export class GrupoPaisComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosGrupoPais) {

  }

  public columnas = [
    { name: "Selección", prop: "pais.nombre" }
  ]
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  public seleccionGrupoEscogida: GrupoPais | undefined;


  escoger(event: any) {
    if (event.type == "click") {
      this.seleccionGrupoEscogida = event.row;
    }
  }

  eliminar() {

  }

  agregar() {

  }

}
