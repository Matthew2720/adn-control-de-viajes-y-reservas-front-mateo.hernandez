export interface Vuelo {
  id: string;
  origen: string;
  destino: string;
  fechaSalida: Date;
  fechaLlegada: Date;
  asientosDisponibles: number;
  precioBase: number;
}
