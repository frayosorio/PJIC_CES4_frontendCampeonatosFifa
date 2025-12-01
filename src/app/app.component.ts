import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ReferenciasMaterialModule } from '../shared/modulos/referencias-material.module';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../features/componentes/login/login.component';
import { UsuarioService } from '../core/servicios/usuario.service';
import { AutorizacionService } from '../core/servicios/autorizacion.service';
import { Usuario } from '../shared/entidades/usuario';
import { NgIf } from '@angular/common';
import { RUTA_DEFAULT } from './app.routes';

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
export class AppComponent implements OnInit {

  public usuarioActual: Usuario | null = null;

  constructor(private dialogoServicio: MatDialog,
    private usuarioServicio: UsuarioService,
    private autorizacionServicio: AutorizacionService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.usuarioActual = this.autorizacionServicio.obtenerUsuario();
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
              if (response.usuario) {
                this.autorizacionServicio.guardarToken(response.token);
                this.autorizacionServicio.guardarUsuario(response.usuario);
                this.usuarioActual = response.usuario;
              }
              else {
                window.alert("Acceso denegado");
              }
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

  logout() {
    this.autorizacionServicio.cerrarSesion();
    this.router.navigate([RUTA_DEFAULT]);
    window.location.reload();
  }

}


