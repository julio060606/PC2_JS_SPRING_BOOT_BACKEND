export interface Matriculado {
  id: number;
  nombre: string;
  email: string;
}

export interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  cupos: number;
  cuposDisponibles: number;
  matriculados: Matriculado[];
}

export interface MatriculadoRequest {
  nombre: string;
  email: string;
}
