export class HotelTestDataBuilder {
  private hoteles: HotelDTO[] = [];

  withHotel(hotel: HotelDTO): HotelTestDataBuilder {
    this.hoteles.push(hotel);
    return this;
  }

  withDefaultHotel(): HotelTestDataBuilder {
    const hotel = {
      id: 1,
      nombre: 'Hotel Test',
      ubicacion: 'Medellín',
    };
    this.withHotel(hotel);
    return this;
  }

  build(): HotelDTO[] {
    return this.hoteles;
  }
}

export interface HotelDTO {
  id: number;
  nombre: string;
  ubicacion: string;
}
