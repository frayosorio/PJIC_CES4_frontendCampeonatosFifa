import { Usuario } from "../entidades/usuario";

export interface UsuarioLoginDto {
    usuario: Usuario;
    token: string;
}