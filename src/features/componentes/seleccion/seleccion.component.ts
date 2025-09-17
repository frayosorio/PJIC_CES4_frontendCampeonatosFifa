import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

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
export class SeleccionComponent {


  buscar() {

  }

  agregar() {

  }

  modificar() {

  }

  eliminar() {

  }
}
