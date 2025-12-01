import { Ciudad } from "./ciudad";

export interface Estadio {
    id: number;
    nombre: string;
    ciudad: Ciudad;
    capacidad: number;
}