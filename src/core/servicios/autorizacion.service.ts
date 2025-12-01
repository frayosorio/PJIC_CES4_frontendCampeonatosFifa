import { Injectable } from '@angular/core';
import { Usuario } from '../../shared/entidades/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {

  private readonly TOKEN_KEY = "token";
  private readonly USUARIO_KEY = "usuario";

  constructor() { }


  guardarToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  guardarUsuario(usuario: Usuario) {
    localStorage.setItem(this.USUARIO_KEY, JSON.stringify(usuario));
  }

  obtenerUsuario(): Usuario | null {
    const objeto = localStorage.getItem(this.USUARIO_KEY);
    return objeto ? JSON.parse(objeto) : null;
    //  return JSON.parse(localStorage.getItem(this.USUARIO_KEY)||"{}") ;
  }

  cerrarSesion(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USUARIO_KEY);
  }
}
