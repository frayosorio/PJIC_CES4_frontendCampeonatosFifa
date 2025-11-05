import { Component, Inject } from '@angular/core';
import { ReferenciasMaterialModule } from '../../modulos/referencias-material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DadosDecision {
  encabezado: string;
  id: number;
}

@Component({
  selector: 'app-decidir',
  imports: [
    ReferenciasMaterialModule
  ],
  templateUrl: './decidir.component.html',
  styleUrl: './decidir.component.css'
})
export class DecidirComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public datos: DadosDecision) {

  }

}
