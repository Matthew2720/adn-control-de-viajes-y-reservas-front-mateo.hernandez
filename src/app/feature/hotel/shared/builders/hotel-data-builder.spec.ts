import { HotelTestDataBuilder } from './hotel-data-builder';

describe('HotelTestDataBuilder', () => {
  it('debería agregar un hotel al builder y construir la lista de hoteles', () => {
    const builder = new HotelTestDataBuilder();
    const hotel = {
      id: 2,
      nombre: 'Otro Hotel',
      ubicacion: 'Bogotá',
    };

    builder.withHotel(hotel);
    const hoteles = builder.build();

    expect(hoteles.length).toBe(1);
    expect(hoteles[0]).toEqual(hotel);
  });

  it('debería agregar el hotel predeterminado al builder', () => {
    const builder = new HotelTestDataBuilder();

    builder.withDefaultHotel();
    const hoteles = builder.build();

    expect(hoteles.length).toBe(1);
    expect(hoteles[0]).toEqual({
      id: 1,
      nombre: 'Hotel Test',
      ubicacion: 'Medellín',
    });
  });
});
