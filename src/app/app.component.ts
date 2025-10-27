import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReferenciasMaterialModule } from '../shared/modulos/referencias-material.module';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../features/componentes/login/login.component';
import { UsuarioService } from '../core/servicios/usuario.service';
import { AutorizacionService } from '../core/servicios/autorizacion.service';
import { Usuario } from '../shared/entidades/usuario';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ReferenciasMaterialModule,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  public usuarioActual: Usuario | null = null;

  constructor(private dialogoServicio: MatDialog,
    private usuarioServicio: UsuarioService,
    private autorizacionServicio: AutorizacionService
  ) {

  }


  login() {
    const cuadroDialogo = this.dialogoServicio.open(LoginComponent, {
      width: "400px",
      height: "300px",
      data: {
        usuario: "",
        clave: ""
      }
    });

    cuadroDialogo.afterClosed().subscribe({
      next: datos => {
        if (datos) {
          this.usuarioServicio.login(datos.usuario, datos.clave).subscribe({
            next: response => {
              this.autorizacionServicio.guardarToken(response.token);
              this.usuarioActual = response.usuario;
            },
            error: error => {
              window.alert(error.message);
            }
          });
        }
        else {
          window.alert("El usuario canceló el LOGIN");
        }
      },
      error: error => {
        window.alert(error);
      }
    });
  }
}
