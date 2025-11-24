import { Component, OnInit } from '@angular/core';
import { Campeonato } from '../../../shared/entidades/campeonato';
import { CampeonatoService } from '../../../core/servicios/campeonato.service';
import { GrupoService } from '../../../core/servicios/grupo.service';
import { MatDialog } from '@angular/material/dialog';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Grupo } from '../../../shared/entidades/grupo';
import { SeleccionService } from '../../../core/servicios/seleccion.service';
import { Seleccion } from '../../../shared/entidades/seleccion';
import { GrupoPaisComponent } from '../grupo-pais/grupo-pais.component';
import { GrupoPais } from '../../../shared/entidades/grupo-pais';

@Component({
  selector: 'app-grupo',
  imports: [
    ReferenciasMaterialModule,
    NgxDatatableModule,
    FormsModule,
    NgFor
  ],
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.css'
})
export class GrupoComponent implements OnInit {

  public campeonatos: Campeonato[] = [];
  public selecciones: Seleccion[] = [];
  public campeonatoEscogido: Campeonato | undefined;
  public grupoEscogido: Grupo | undefined;
  public indiceGrupoEscogido: number = -1;
  public grupos: Grupo[] = [];

  public columnas = [
    { name: "Nombre", prop: "nombre" },
    { name: "Países", prop: "paises" },
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  constructor(private grupoServicio: GrupoService,
    private campeonatoServicio: CampeonatoService,
    private seleccionServicio: SeleccionService,
    public dialogServicio: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarCampeonatos();
    this.listarSelecciones();
  }

  escoger(event: any) {
    if (event.type == "click") {
      this.grupoEscogido = event.row;
      this.indiceGrupoEscogido = this.grupos.findIndex(grupo => grupo == this.grupoEscogido);
    }
  }

  public listarCampeonatos() {
    this.campeonatoServicio.listar().subscribe(
      {
        next: response => {
          this.campeonatos = response;
        },
        error: error => {
          window.alert(error.message);
        }
      }
    );
  }

  public listarSelecciones() {
    this.seleccionServicio.listar().subscribe(
      {
        next: response => {
          this.selecciones = response;
        },
        error: error => {
          window.alert(error.message);
        }
      }
    );
  }

  public listarGrupos() {
    if (this.campeonatoEscogido) {
      this.grupoServicio.listarCampeonato(this.campeonatoEscogido.id).subscribe({
        next: response => {
          this.grupos = response;

          // Llamar a listarPaises por cada grupo
          for (let grupo of this.grupos) {
            this.grupoServicio.listarPaises(grupo.id).subscribe({
              next: response => {
                grupo.paises = response.map(grupoPais => grupoPais.pais.nombre).join(", ");
              },
              error: error => {
                window.alert(error);
              }
            });
          }
        },
        error: error => {
          window.alert(error);
        }
      });
    }
  }

  agregar() {
  }

  modificar() {

  }

  eliminar() {

  }

  seleccionesGrupo() {
    if (this.grupoEscogido) {
      this.grupoServicio.listarPaises(this.grupoEscogido.id).subscribe({
        next: response => {
          const cuadroDialogo = this.dialogServicio.open(GrupoPaisComponent, {
            width: "600px",
            height: "500px",
            data: {
              encabezado: `Selecciones del Grupo [${this.grupoEscogido?.nombre}]`,
              seleccionesGrupo: response,
              selecciones: this.selecciones,
              grupo: this.grupoEscogido,
            }
          });

          cuadroDialogo.afterClosed().subscribe(
            seleccionesGrupo => {
              this.grupoEscogido!.paises = seleccionesGrupo.map((grupoPais: GrupoPais) => grupoPais.pais.nombre).join(", ");
            }
          );
        },
        error: error => {
          window.alert(error.message);
        }
      });
    }
    else {
      window.alert("Se debe elegir un Grupo de la lista");
    }
  }

  encuentrosGrupo() {

  }

  posicionesGrupo() {

  }

}
