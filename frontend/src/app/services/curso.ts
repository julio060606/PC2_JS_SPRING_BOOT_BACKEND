import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Curso, Matriculado, MatriculadoRequest } from '../models/curso';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private readonly url = `${environment.apiUrl}/cursos`;

  constructor(private readonly http: HttpClient) {}

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.url);
  }

  matricular(cursoId: number, request: MatriculadoRequest): Observable<Matriculado> {
    return this.http.post<Matriculado>(`${this.url}/${cursoId}/matriculados`, request);
  }
}
