import { ReservaTestDataBuilder } from './reserva-hotel-data-builder';

describe('ReservaTestDataBuilder', () => {
  it('debería agregar una reserva al builder y construir la lista de reservas', () => {
    const builder = new ReservaTestDataBuilder();
    const reserva = {
      id: '2',
      fechaEntrada: '2023-09-02',
      fechaSalida: '2023-09-06',
      hotel: {
        nombre: 'Otro Hotel',
        ubicacion: 'Bogotá',
      },
      habitacion: {
        numeroHabitacion: '202',
      },
      costoTotal: '1200',
      estado: 'Activa',
    };

    builder.withReserva(reserva);
    const reservas = builder.build();

    expect(reservas.length).toBe(1);
    expect(reservas[0]).toEqual(reserva);
  });

  it('debería agregar la reserva predeterminada al builder', () => {
    const builder = new ReservaTestDataBuilder();

    builder.withDefaultReservaHotel();
    const reservas = builder.build();

    expect(reservas.length).toBe(1);
    expect(reservas[0]).toEqual({
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
    });
  });
});
