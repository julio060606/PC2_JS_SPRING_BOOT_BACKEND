import { Routes } from '@angular/router';
import { Cursos } from './components/cursos/cursos';
import { Inicio } from './components/inicio/inicio';
import { Incidencias } from './components/incidencias/incidencias';
import { ProductosComponent } from './components/productos/productos';
import { Tareas } from './components/tareas/tareas';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'productos', component: ProductosComponent },
  { path: 'incidencias', component: Incidencias },
  { path: 'cursos', component: Cursos },
  { path: 'tareas', component: Tareas },
  { path: '**', redirectTo: '' },
];
