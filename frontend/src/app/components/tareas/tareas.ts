import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ApiError } from '../../models/api-error';
import { Tarea } from '../../models/tarea';
import { TareaService } from '../../services/tarea';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css',
})
export class Tareas implements OnInit {
  readonly tareas = signal<Tarea[]>([]);
  readonly edicionId = signal<number | undefined>(undefined);
  readonly mensaje = signal('');
  readonly error = signal('');
  readonly cargando = signal(false);
  formulario: Tarea = { titulo: '', descripcion: '', completada: false };

  constructor(private readonly tareaService: TareaService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    this.tareaService.getTareas().subscribe({
      next: (datos) => {
        this.tareas.set(datos);
        this.cargando.set(false);
      },
      error: (response: HttpErrorResponse) => {
        this.error.set(this.mensajeError(response));
        this.cargando.set(false);
      },
    });
  }

  guardar(): void {
    this.limpiarMensajes();
    const id = this.edicionId();
    if (id === undefined) {
      this.tareaService.registrarTarea(this.formulario).subscribe({
        next: () => {
          this.mensaje.set('Tarea registrada correctamente.');
          this.reiniciarFormulario();
          this.cargar();
        },
        error: (response: HttpErrorResponse) => this.error.set(this.mensajeError(response)),
      });
      return;
    }

    this.tareaService.actualizarTarea(id, this.formulario).subscribe({
      next: () => {
        this.mensaje.set('Tarea actualizada correctamente.');
        this.reiniciarFormulario();
        this.cargar();
      },
      error: (response: HttpErrorResponse) => this.error.set(this.mensajeError(response)),
    });
  }

  editar(tarea: Tarea): void {
    this.edicionId.set(tarea.id);
    this.formulario = {
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      completada: tarea.completada,
    };
    this.limpiarMensajes();
  }

  eliminar(tarea: Tarea): void {
    if (tarea.id === undefined) {
      return;
    }
    this.limpiarMensajes();
    this.tareaService.eliminarTarea(tarea.id).subscribe({
      next: () => {
        this.mensaje.set('Tarea eliminada correctamente.');
        if (this.edicionId() === tarea.id) {
          this.reiniciarFormulario();
        }
        this.cargar();
      },
      error: (response: HttpErrorResponse) => this.error.set(this.mensajeError(response)),
    });
  }

  cancelarEdicion(): void {
    this.reiniciarFormulario();
    this.limpiarMensajes();
  }

  private reiniciarFormulario(): void {
    this.edicionId.set(undefined);
    this.formulario = { titulo: '', descripcion: '', completada: false };
  }

  private limpiarMensajes(): void {
    this.mensaje.set('');
    this.error.set('');
  }

  private mensajeError(response: HttpErrorResponse): string {
    return (response.error as ApiError)?.message ?? 'No se pudo completar la operacion.';
  }
}
