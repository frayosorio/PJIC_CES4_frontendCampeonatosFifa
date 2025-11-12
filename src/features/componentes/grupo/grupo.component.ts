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
  public campeonatoEscogido: Campeonato | undefined;
  public grupos: Grupo[] = [];

  public columnas = [
    { name: "Nombre", prop: "nombre" },
    { name: "Países", prop: "paises" },
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  constructor(private grupoServicio: GrupoService,
    private campeonatoServicio: CampeonatoService,
    public dialogServicio: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarCampeonatos();
  }

  escoger(event: any) {

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

}
