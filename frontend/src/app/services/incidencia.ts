import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Incidencia, IncidenciaRequest } from '../models/incidencia';

@Injectable({
  providedIn: 'root',
})
export class IncidenciaService {
  private readonly url = `${environment.apiUrl}/incidencias`;

  constructor(private readonly http: HttpClient) {}

  getIncidencias(): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(this.url);
  }

  actualizarIncidencia(id: number, incidencia: IncidenciaRequest): Observable<Incidencia> {
    return this.http.put<Incidencia>(`${this.url}/${id}`, incidencia);
  }
}
