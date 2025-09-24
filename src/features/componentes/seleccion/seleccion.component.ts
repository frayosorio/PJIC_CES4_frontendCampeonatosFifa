import { Component, OnInit } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { Seleccion } from '../../../shared/entidades/seleccion';
import { SeleccionService } from '../../../core/servicios/seleccion.service';

@Component({
  selector: 'app-seleccion',
  //standalone: true,
  imports: [
    ReferenciasMaterialModule,
    NgxDatatableModule
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

  constructor(private seleccionServicio: SeleccionService) {

  }

  ngOnInit(): void {
    this.listar();
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

  }

  agregar() {

  }

  modificar() {

  }

  eliminar() {

  }
}
