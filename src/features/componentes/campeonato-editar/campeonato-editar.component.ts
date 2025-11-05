import { Component, Inject } from '@angular/core';
import { Campeonato } from '../../../shared/entidades/campeonato';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { Seleccion } from '../../../shared/entidades/seleccion';
import { NgFor } from '@angular/common';

export interface DadosEdicionCampeonato {
  encabezado: string;
  campeonato: Campeonato;
  paises: Seleccion[];
}

@Component({
  selector: 'app-campeonato-editar',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgFor
  ],
  templateUrl: './campeonato-editar.component.html',
  styleUrl: './campeonato-editar.component.css'
})
export class CampeonatoEditarComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public datos: DadosEdicionCampeonato) {

  }

  public compararPaises(pais1: Seleccion, pais2: Seleccion): boolean {
    return pais1 && pais2 ? pais1.id == pais2.id : pais1 === pais2;
  }
}
