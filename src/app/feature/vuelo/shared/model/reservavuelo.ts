export interface ReservaVueloDTO {
  id: string;
  nombreCliente: string;
  fechaSalidaVuelo: string;
  fechaReserva: string;
  pasajeros: number;
  precioFinal: number;
  estadoReserva: string;
}

export interface ReservaResponseVuelo {
  id: string;
  cliente: {
    nombre: string;
  };
  vuelo: {
    fechaSalida: string;
  };
  fechaHoraReserva: string;
  pasajeros: number;
  precioFinal: number;
  estadoReserva: string;
}

