import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Encuentro } from '../../shared/entidades/encuentro';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncuentroService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlBase}encuentros/`;
  }

  public listarGrupo(idGrupo: number): Observable<Encuentro[]> {
    return this.http.get<Encuentro[]>(`${this.url}listargrupo/${idGrupo}`);
  }
}
