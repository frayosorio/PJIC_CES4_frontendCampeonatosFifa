import { Component } from '@angular/core';
import { Campeonato } from '../../../shared/entidades/campeonato';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { CampeonatoService } from '../../../core/servicios/campeonato.service';
import { MatDialog } from '@angular/material/dialog';
import { CampeonatoEditarComponent } from '../campeonato-editar/campeonato-editar.component';
import { DecidirComponent } from '../../../shared/componentes/decidir/decidir.component';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { SeleccionService } from '../../../core/servicios/seleccion.service';
import { Seleccion } from '../../../shared/entidades/seleccion';

@Component({
  selector: 'app-campeonato',
  imports: [
    ReferenciasMaterialModule,
    NgxDatatableModule,
    FormsModule
  ],
  templateUrl: './campeonato.component.html',
  styleUrl: './campeonato.component.css'
})
export class CampeonatoComponent {

  public campeonatos: Campeonato[] = [];
  public paises: Seleccion[] = [];

  public columnas = [
    { name: "Nombre del campeonato", prop: "nombre" },
    { name: "País Organizador", prop: "pais.nombre" },
    { name: "Año", prop: "año" },
  ];

  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  public campeonatoEscogido: Campeonato | undefined;
  public indiceCampeonatoEscogido: number = -1;

  public textoBusqueda = "";

  constructor(private campeonatoServicio: CampeonatoService,
    private seleccionServicio: SeleccionService,
    private dialogoServicio: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.listar();
    this.listarPaises()
  }

  escoger(event: any) {
    if (event.type == "click") {
      this.campeonatoEscogido = event.row;
      this.indiceCampeonatoEscogido = this.campeonatos.findIndex((campeonato) => campeonato == this.campeonatoEscogido);
    }
  }

  listar() {
    this.campeonatoServicio.listar().subscribe({
      next: (response) => {
        this.campeonatos = response;
        this.campeonatos.map((campeonato) => { campeonato.year = campeonato.año });
      },
      error: (error) => {
        window.alert(error.message);
      }
    });
  }

  listarPaises() {
    this.seleccionServicio.listar().subscribe({
      next: (response) => {
        this.paises = response;
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
      this.campeonatoServicio.buscar(this.textoBusqueda).subscribe({
        next: response => {
          this.campeonatos = response;
          this.campeonatos.map((campeonato) => { campeonato.year = campeonato.año });
        },
        error: error => {
          window.alert(error.message);
        }
      });
    }
  }

  agregar() {
    const cuadroDialogo = this.dialogoServicio.open(CampeonatoEditarComponent, {
      width: "500px",
      height: "400px",
      data: {
        encabezado: "Agregando un nuevo Campeonato Mundial de Fútbol",
        campeonato: {
          id: 0,
          nombre: "",
          año: 0, year: new Date().getFullYear(),
          pais: {
            id: 0, nombre: "", entidad: ""
          },
        },
        paises: this.paises,
      },
      disableClose: true,
    });

    cuadroDialogo.afterClosed().subscribe({
      next: datos => {
        if (datos) {
          this.campeonatoServicio.agregar(datos.campeonato).subscribe({
            next: response => {
              this.campeonatoServicio.buscar(response.nombre).subscribe({
                next: response => {
                  this.campeonatos = response;
                  this.campeonatos.map((campeonato) => { campeonato.year = campeonato.año });
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
          window.alert("El usuario canceló AGREGAR CAMPEONATO");
        }
      },
      error: error => {
        window.alert(error);
      }
    });
  }

  modificar() {
    if (this.campeonatoEscogido) {
      const cuadroDialogo = this.dialogoServicio.open(CampeonatoEditarComponent, {
        width: "500px",
        height: "400px",
        data: {
          encabezado: `Modificando el Campeonato Mundial de Fútbol [${this.campeonatoEscogido?.nombre}]`,
          campeonato: this.campeonatoEscogido,
          paises: this.paises,
        },
        disableClose: true,
      });

      cuadroDialogo.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.campeonatoServicio.modificar(datos.campeonato).subscribe({
              next: response => {
                this.campeonatos[this.indiceCampeonatoEscogido] = response;
                this.campeonatos[this.indiceCampeonatoEscogido].year = this.campeonatos[this.indiceCampeonatoEscogido].año;
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
          else {
            window.alert("El usuario canceló MODIFICAR CAMPEONATO");
          }
        },
        error: error => {
          window.alert(error);
        }
      });


    }
    else {
      window.alert("Se debe escoger el Campeonato Mundial de Fútbol a editar");
    }
  }

  eliminar() {
    if (this.campeonatoEscogido) {
      const cuadroDialogo = this.dialogoServicio.open(DecidirComponent, {
        width: "300px",
        height: "200px",
        data: {
          encabezado: `Está seguro de eliminar el Campeonato Mundial de Fútbol [${this.campeonatoEscogido?.nombre}] ?`,
          id: this.campeonatoEscogido.id,
        },
        disableClose: true,
      });

      cuadroDialogo.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.campeonatoServicio.eliminar(datos.id).subscribe({
              next: response => {
                if (response) {
                  this.campeonatos.splice(this.indiceCampeonatoEscogido, 1);
                  window.alert("El Campeonato Mundial de Fútbol fue retirado con éxito");
                }
                else {
                  window.alert("No se puede eliminar el Campeonato Mundial de Fútbol");
                }
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
          else {
            window.alert("El usuario canceló ELIMINAR CAMPEONATO");
          }
        },
        error: error => {
          window.alert(error);
        }
      });
    }
    else {
      window.alert("Se debe escoger el Campeonato Mundial de Fútbol a eliminar");
    }
  }

}
