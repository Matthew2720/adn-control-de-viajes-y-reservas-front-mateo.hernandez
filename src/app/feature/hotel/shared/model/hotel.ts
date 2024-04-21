export interface Habitacion {
  id: number;
  numeroHabitacion: number;
  disponibilidad: boolean;
}

export interface Hotel {
  id: number;
  nombre: string;
  ubicacion: string;
  habitaciones: Habitacion[];
  costoPorNoche: number;
}
