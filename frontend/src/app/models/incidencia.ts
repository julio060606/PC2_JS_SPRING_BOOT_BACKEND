export type EstadoIncidencia = 'PENDIENTE' | 'EN_PROCESO' | 'RESUELTA';

export interface Incidencia {
  id: number;
  titulo: string;
  descripcion: string;
  estado: EstadoIncidencia;
}

export type IncidenciaRequest = Omit<Incidencia, 'id'>;
