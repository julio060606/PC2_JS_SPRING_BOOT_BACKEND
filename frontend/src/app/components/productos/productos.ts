import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ApiError } from '../../models/api-error';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css'],
})
export class ProductosComponent implements OnInit {
  readonly listaProductos = signal<Producto[]>([]);
  readonly mensaje = signal('');
  readonly error = signal('');
  readonly cargando = signal(false);
  nuevoProducto: Producto = { nombre: '', precio: 0, stock: 0 };

  constructor(private readonly productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos(): void {
    this.cargando.set(true);
    this.productoService.getProductos().subscribe({
      next: (datos) => {
        this.listaProductos.set(datos);
        this.cargando.set(false);
      },
      error: (response: HttpErrorResponse) => {
        this.error.set(this.mensajeError(response));
        this.cargando.set(false);
      },
    });
  }

  guardarProducto(): void {
    this.limpiarMensajes();
    this.productoService.insertarProducto(this.nuevoProducto).subscribe({
      next: () => {
        this.mensaje.set('Producto registrado correctamente.');
        this.nuevoProducto = { nombre: '', precio: 0, stock: 0 };
        this.obtenerDatos();
      },
      error: (response: HttpErrorResponse) => this.error.set(this.mensajeError(response)),
    });
  }

  private limpiarMensajes(): void {
    this.mensaje.set('');
    this.error.set('');
  }

  private mensajeError(response: HttpErrorResponse): string {
    return (response.error as ApiError)?.message ?? 'No se pudo completar la operacion.';
  }
}
