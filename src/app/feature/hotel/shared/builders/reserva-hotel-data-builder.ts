import { ReservaResponse } from '../model/reservahotel';

export class ReservaTestDataBuilder {
  private reservas: ReservaResponse[] = [];

  withReserva(reserva: ReservaResponse): ReservaTestDataBuilder {
    this.reservas.push(reserva);
    return this;
  }

  withDefaultReservaHotel(): ReservaTestDataBuilder {
    const reserva = {
      id: '1',
      fechaEntrada: '2023-09-01',
      fechaSalida: '2023-09-05',
      hotel: {
        nombre: 'Hotel Test',
        ubicacion: 'Medellín',
      },
      habitacion: {
        numeroHabitacion: '101',
      },
      costoTotal: '1000',
      estado: 'Activa',
    };
    this.withReserva(reserva);
    return this;
  }

  build(): ReservaResponse[] {
    return this.reservas;
  }
}
