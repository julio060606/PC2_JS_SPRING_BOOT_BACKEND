import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ApiError } from '../../models/api-error';
import { EstadoIncidencia, Incidencia, IncidenciaRequest } from '../../models/incidencia';
import { IncidenciaService } from '../../services/incidencia';

@Component({
  selector: 'app-incidencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './incidencias.html',
  styleUrl: './incidencias.css',
})
export class Incidencias implements OnInit {
  readonly incidencias = signal<Incidencia[]>([]);
  readonly estados: EstadoIncidencia[] = ['PENDIENTE', 'EN_PROCESO', 'RESUELTA'];
  readonly seleccionadaId = signal<number | undefined>(undefined);
  readonly mensaje = signal('');
  readonly error = signal('');
  readonly cargando = signal(false);
  formulario: IncidenciaRequest = { titulo: '', descripcion: '', estado: 'PENDIENTE' };

  constructor(private readonly incidenciaService: IncidenciaService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    this.incidenciaService.getIncidencias().subscribe({
      next: (datos) => {
        this.incidencias.set(datos);
        this.cargando.set(false);
      },
      error: (response: HttpErrorResponse) => {
        this.error.set(this.mensajeError(response));
        this.cargando.set(false);
      },
    });
  }

  editar(incidencia: Incidencia): void {
    this.seleccionadaId.set(incidencia.id);
    this.formulario = {
      titulo: incidencia.titulo,
      descripcion: incidencia.descripcion,
      estado: incidencia.estado,
    };
    this.limpiarMensajes();
  }

  actualizar(): void {
    const id = this.seleccionadaId();
    if (id === undefined) {
      return;
    }
    this.limpiarMensajes();
    this.incidenciaService.actualizarIncidencia(id, this.formulario).subscribe({
      next: () => {
        this.mensaje.set('Incidencia actualizada correctamente.');
        this.cancelar();
        this.cargar();
      },
      error: (response: HttpErrorResponse) => this.error.set(this.mensajeError(response)),
    });
  }

  cancelar(): void {
    this.seleccionadaId.set(undefined);
    this.formulario = { titulo: '', descripcion: '', estado: 'PENDIENTE' };
  }

  private limpiarMensajes(): void {
    this.mensaje.set('');
    this.error.set('');
  }

  private mensajeError(response: HttpErrorResponse): string {
    return (response.error as ApiError)?.message ?? 'No se pudo completar la operacion.';
  }
}
