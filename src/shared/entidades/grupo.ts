import { Campeonato } from "./campeonato";

export interface Grupo {
    id: number;
    campeonato: Campeonato;
    nombre: string;
    paises: string;
}