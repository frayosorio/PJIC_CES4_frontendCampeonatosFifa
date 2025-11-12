import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Grupo } from '../../shared/entidades/grupo';
import { GrupoPais } from '../../shared/entidades/grupo-pais';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlBase}grupos/`;
  }

  public listarCampeonato(idCampeonato: number): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.url}listarcampeonato/${idCampeonato}`);
  }


  // ***** Paises del Grupo *****

  public listarPaises(idGrupo: number): Observable<GrupoPais[]> {
    return this.http.get<GrupoPais[]>(`${this.url}listarpaises/${idGrupo}`);
  }


}
