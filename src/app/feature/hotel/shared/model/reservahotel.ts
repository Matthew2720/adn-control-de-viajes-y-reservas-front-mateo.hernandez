export interface ReservaHotelDTO {
  id: string;
  fechaEntrada: string;
  fechaSalida: string;
  nombreHotel: string;
  ubicacion: string;
  numeroHabitacion: string;
  costoTotal: string;
  estado: string;
}

export interface ReservaResponse {
  id: string;
  fechaEntrada: string;
  fechaSalida: string;
  hotel: {
    nombre: string;
    ubicacion: string;
  };
  habitacion: {
    numeroHabitacion: string;
  };
  costoTotal: string;
  estado: string;
}
