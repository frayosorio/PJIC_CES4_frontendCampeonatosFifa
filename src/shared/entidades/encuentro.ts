import { Campeonato } from "./campeonato";
import { Estadio } from "./estadio";
import { Fase } from "./fase";
import { Seleccion } from "./seleccion";

export interface Encuentro {
    id: number;
    campeonato: Campeonato;
    fase: Fase;
    pais1: Seleccion;
    goles1: number;
    penales1: number;
    pais2: Seleccion;
    goles2: number;
    penales2: number;
    estadio: Estadio;
    fecha: Date;
}