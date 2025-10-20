import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReferenciasMaterialModule } from '../shared/modulos/referencias-material.module';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../features/componentes/login/login.component';
import { UsuarioService } from '../core/servicios/usuario.service';
import { AutorizacionService } from '../core/servicios/autorizacion.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ReferenciasMaterialModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CampeonatosFIFA';

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
        this.usuarioServicio.login(datos.usuario, datos.clave).subscribe({
          next: response => {
            this.autorizacionServicio.guardarToken(response.token);
            window.alert(response.token);
          },
          error: error => {
            window.alert(error.message);
          }
        });
      },
      error: error => {
        window.alert(error);
      }
    });
  }
}
