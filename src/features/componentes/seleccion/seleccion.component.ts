import { Component, OnInit } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { ColumnMode, NgxDatatableModule, SelectionType } from "@swimlane/ngx-datatable";
import { Seleccion } from '../../../shared/entidades/seleccion';
import { SeleccionService } from '../../../core/servicios/seleccion.service';
import { MatDialog } from '@angular/material/dialog';
import { SeleccionEditarComponent } from '../seleccion-editar/seleccion-editar.component';
import { FormsModule } from '@angular/forms';
import { DecidirComponent } from '../../../shared/componentes/decidir/decidir.component';

@Component({
  selector: 'app-seleccion',
  //standalone: true,
  imports: [
    ReferenciasMaterialModule,
    NgxDatatableModule,
    FormsModule
  ],
  templateUrl: './seleccion.component.html',
  styleUrl: './seleccion.component.css'
})
export class SeleccionComponent implements OnInit {

  public selecciones: Seleccion[] = [];
  public columnas = [
    { name: "Nombre de la Selección", prop: "nombre" },
    { name: "Entidad regente del Fútbol", prop: "entidad" }
  ];

  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  public seleccionEscogida: Seleccion | undefined;
  public indiceSeleccionEscogida: number = -1;

  public textoBusqueda = "";

  constructor(private seleccionServicio: SeleccionService,
    private dialogoServicio: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.listar();
  }

  escoger(event: any) {
    if (event.type == "click") {
      this.seleccionEscogida = event.row;
      this.indiceSeleccionEscogida = this.selecciones.findIndex((seleccion) => seleccion == this.seleccionEscogida);
    }
  }

  listar() {
    this.seleccionServicio.listar().subscribe({
      next: (response) => {
        this.selecciones = response;
      },
      error: (error) => {
        window.alert(error.message);
      }
    });
  }

  buscar() {
    if (this.textoBusqueda.length == 0) {
      this.listar();
    }
    else {
      this.seleccionServicio.buscar(this.textoBusqueda).subscribe({
        next: response => {
          this.selecciones = response;
        },
        error: error => {
          window.alert(error.message);
        }
      });
    }
  }

  agregar() {
    const cuadroDialogo = this.dialogoServicio.open(SeleccionEditarComponent, {
      width: "500px",
      height: "300px",
      data: {
        encabezado: "Agregando una nueva Selección de Fútbol",
        seleccion: {
          id: 0,
          nombre: "",
          entidad: "",
        }
      },
      disableClose: true,
    });

    cuadroDialogo.afterClosed().subscribe({
      next: datos => {
        if (datos) {
          this.seleccionServicio.agregar(datos.seleccion).subscribe({
            next: response => {
              this.seleccionServicio.buscar(response.nombre).subscribe({
                next: response => {
                  this.selecciones = response;
                },
                error: error => {
                  window.alert(error.message);
                }
              });
            },
            error: error => {
              window.alert(error.message);
            }
          });
        }
        else {
          window.alert("El usuario canceló AGREGAR SELECCION");
        }
      },
      error: error => {
        window.alert(error);
      }
    });
  }

  modificar() {
    if (this.seleccionEscogida) {
      const cuadroDialogo = this.dialogoServicio.open(SeleccionEditarComponent, {
        width: "500px",
        height: "300px",
        data: {
          encabezado: `Modificando la Selección de Fútbol [${this.seleccionEscogida?.nombre}]`,
          seleccion: this.seleccionEscogida
        },
        disableClose: true,
      });

      cuadroDialogo.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.seleccionServicio.modificar(datos.seleccion).subscribe({
              next: response => {
                this.selecciones[this.indiceSeleccionEscogida] = response;
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
          else {
            window.alert("El usuario canceló MODIFICAR SELECCION");
          }
        },
        error: error => {
          window.alert(error);
        }
      });


    }
    else {
      window.alert("Se debe escoger la Selección de Fútbol a editar");
    }
  }

  eliminar() {
    if (this.seleccionEscogida) {
      const cuadroDialogo = this.dialogoServicio.open(DecidirComponent, {
        width: "300px",
        height: "200px",
        data: {
          encabezado: `Está seguro de eliminar la Selección de Fútbol [${this.seleccionEscogida?.nombre}] ?`,
          id: this.seleccionEscogida.id,
        },
        disableClose: true,
      });

      cuadroDialogo.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.seleccionServicio.eliminar(datos.id).subscribe({
              next: response => {
                if (response) {
                  this.selecciones.splice(this.indiceSeleccionEscogida, 1);
                  window.alert("La Selección de Fútbol fue retirada con éxito");
                }
                else {
                  window.alert("No se puede eliminar la Selección de Fútbol");
                }
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
          else {
            window.alert("El usuario canceló ELIMINAR SELECCION");
          }
        },
        error: error => {
          window.alert(error);
        }
      });
    }
    else {
      window.alert("Se debe escoger la Selección de Fútbol a eliminar");
    }
  }
}
