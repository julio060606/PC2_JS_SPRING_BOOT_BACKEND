import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ApiError } from '../../models/api-error';
import { Curso, MatriculadoRequest } from '../../models/curso';
import { CursoService } from '../../services/curso';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css',
})
export class Cursos implements OnInit {
  readonly cursos = signal<Curso[]>([]);
  readonly cursoSeleccionado = signal<Curso | undefined>(undefined);
  readonly mensaje = signal('');
  readonly error = signal('');
  readonly cargando = signal(false);
  matricula: MatriculadoRequest = { nombre: '', email: '' };

  constructor(private readonly cursoService: CursoService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    this.cursoService.getCursos().subscribe({
      next: (datos) => {
        this.cursos.set(datos);
        this.cargando.set(false);
      },
      error: (response: HttpErrorResponse) => {
        this.error.set(this.mensajeError(response));
        this.cargando.set(false);
      },
    });
  }

  seleccionar(curso: Curso): void {
    this.cursoSeleccionado.set(curso);
    this.matricula = { nombre: '', email: '' };
    this.limpiarMensajes();
  }

  registrarMatricula(): void {
    const seleccionado = this.cursoSeleccionado();
    if (!seleccionado) {
      return;
    }
    const cursoId = seleccionado.id;
    this.limpiarMensajes();
    this.cursoService.matricular(cursoId, this.matricula).subscribe({
      next: () => {
        this.mensaje.set('Matricula registrada correctamente.');
        this.cursoSeleccionado.set(undefined);
        this.matricula = { nombre: '', email: '' };
        this.cargar();
      },
      error: (response: HttpErrorResponse) => this.error.set(this.mensajeError(response)),
    });
  }

  cancelar(): void {
    this.cursoSeleccionado.set(undefined);
    this.matricula = { nombre: '', email: '' };
  }

  private limpiarMensajes(): void {
    this.mensaje.set('');
    this.error.set('');
  }

  private mensajeError(response: HttpErrorResponse): string {
    return (response.error as ApiError)?.message ?? 'No se pudo completar la operacion.';
  }
}
