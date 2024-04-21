import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReservaTestDataBuilder } from '../builders/reserva-hotel-data-builder';
import { HotelTestDataBuilder } from '../builders/hotel-data-builder';
import { HotelService } from './hotel.service';
import { HttpService } from '@core-service/http.service';


describe('HotelService', () => {
  let service: HotelService;
  let httpService: HttpService;
  const mockReservaHotelResponse = new ReservaTestDataBuilder().withDefaultReservaHotel().build();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HotelService, HttpService]
    });
    service = TestBed.inject(HotelService);
    httpService = TestBed.inject(HttpService);
  });

  it('deberia crear correcamente', () => {
    expect(service).toBeTruthy();
  });

  it('deberia obtener reservaciones', () => {
    const idCliente = '123';
    spyOn(httpService, 'doGet').and.returnValue(of(mockReservaHotelResponse));

    service.obtenerReservas(idCliente).subscribe(reservas => {
      expect(reservas[0].id).toBe('1');
      expect(reservas[0].fechaEntrada).toBe('2023-09-01');
      expect(reservas[0].fechaSalida).toBe('2023-09-05');
      expect(reservas[0].nombreHotel).toBe('Hotel Test');
      expect(reservas[0].ubicacion).toBe('Medellín');
      expect(reservas[0].numeroHabitacion).toBe('101');
      expect(reservas[0].costoTotal).toBe('1000');
      expect(reservas[0].estado).toBe('Activa');
    });

    expect(httpService.doGet).toHaveBeenCalledWith(`${environment.endpoint}/reservas/hotel/${idCliente}`);
  });

  it('deberia obtener hoteles por ubicacion', () => {
    const ubicacionFiltrada = 'Medellín';
    const hotelMedellin = {id: 1, nombre: 'Hotel Test',ubicacion: 'Medellín'};
    const hotelBogota = {id: 2, nombre: 'Hotel Camara', ubicacion: 'Bogotá'};
    const mockResponse = new HotelTestDataBuilder()
      .withHotel(hotelMedellin)
      .withHotel(hotelBogota)
      .build();
    spyOn(httpService, 'doGet').and.returnValue(of(mockResponse));

    service.obtenerPorUbicacion(ubicacionFiltrada).subscribe(hoteles => {
      expect(hoteles[0].id).toBe(1);
      expect(hoteles[0].nombre).toBe('Hotel Test');
      expect(hoteles[0].ubicacion).toBe('Medellín');
    });

    expect(httpService.doGet).toHaveBeenCalledWith(`${environment.endpoint}/hoteles`);
  });

  it('deberia crear una reservacion', () => {
    const idCliente = '123';
    const idHotel = '1';
    const idHabitacion = '101';
    const fechaEntrada = '2023-09-01';
    const fechaSalida = '2023-09-05';
    const mockResponse = true;
    spyOn(httpService, 'doPost').and.returnValue(of(mockResponse));

    service.crear(idCliente, idHotel, idHabitacion, fechaEntrada, fechaSalida).subscribe(response => {
      expect(response).toBe(true);
    });

    expect(httpService.doPost).toHaveBeenCalledWith(
      `${environment.endpoint}/reservahotel`,
      { idCliente, idHotel, idHabitacion, fechaEntrada, fechaSalida }
    );
  });

  it('deberia anular una reservacion', () => {
    const idReserva = '1';
    const mockResponse = true;
    spyOn(httpService, 'doDelete').and.returnValue(of(mockResponse));

    service.anular(idReserva).subscribe(response => {
      expect(response).toBe(true);
    });

    expect(httpService.doDelete).toHaveBeenCalledWith(`${environment.endpoint}/reservahotel/cancelar/${idReserva}`);
  });
});
