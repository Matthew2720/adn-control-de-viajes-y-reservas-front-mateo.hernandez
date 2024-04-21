import { TestBed } from '@angular/core/testing';
import { VueloService } from './vuelo.service';
import { environment } from 'src/environments/environment';
import { Vuelo } from '../model/vuelo';
import { of } from 'rxjs';

import { HttpService } from '@core-service/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('VueloService', () => {
  let service: VueloService;
  let httpService: HttpService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VueloService, HttpService]
    });

    httpService = TestBed.inject(HttpService);
    service = TestBed.inject(VueloService);
  });

  it('deberia crear correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('deberia llamar al metodo buscar con los parametros correctos', () => {
    const spy = spyOn(httpService, 'doGet').and.callThrough();
    service.buscar('Bogota', 'Medellin', '2');
    expect(spy).toHaveBeenCalledWith(`${environment.endpoint}/vuelos`);
  });

  it('deberia llamar al metodo crear con los parametros correctos', () => {
    const spy = spyOn(httpService, 'doPost').and.callThrough();
    service.crear('1', '1', '2');
    expect(spy).toHaveBeenCalledWith(`${environment.endpoint}/reserva`, {idCliente: '1', idVuelo: '1', pasajeros: '2'});
  });

  it('deberia llamar al metodo anular con los parametros correctos', () => {
    const spy = spyOn(httpService, 'doDelete').and.callThrough();
    service.anular('1');
    expect(spy).toHaveBeenCalledWith(`${environment.endpoint}/reserva/cancelar/1`);
  });

  it('deberia llamar al metodo obtenerReservas con los parametros correctos', () => {
    const spy = spyOn(httpService, 'doGet').and.callThrough();
    service.obtenerReservas('1');
    expect(spy).toHaveBeenCalledWith(`${environment.endpoint}/reservas/vuelo/1`);
  });

  it('debería devolver los vuelos que cumplen con los criterios de búsqueda', () => {
    const aumentoDias = 2;
    const vuelos: Vuelo[] = [
      {
        id: '1',
        fechaSalida: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        fechaLlegada: new Date(new Date().setMonth(new Date().getMonth() + aumentoDias)),
        origen: 'Bogota',
        destino: 'Medellin',
        asientosDisponibles: 2,
        precioBase: 1000
      },
      { id: '2',
        fechaSalida: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        fechaLlegada: new Date(new Date().setMonth(new Date().getMonth() + aumentoDias)),
        origen: 'Bogota',
        destino: 'Cali',
        asientosDisponibles: 2,
        precioBase: 1000
      }
    ];
    spyOn(httpService, 'doGet').and.returnValue(of(vuelos));
    service.buscar('Bogota', 'Medellin', '2').subscribe((result) => {
      expect(result.length).toBe(1);
      expect(result[0].origen).toBe('Bogota');
      expect(result[0].destino).toBe('Medellin');
    });
  });
});
