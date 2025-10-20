import { Component, Inject } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

export interface DatosLogin {
  usuario: string;
  clave: string;
}

@Component({
  selector: 'app-login',
  imports: [
    ReferenciasMaterialModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosLogin) {

  }

}
