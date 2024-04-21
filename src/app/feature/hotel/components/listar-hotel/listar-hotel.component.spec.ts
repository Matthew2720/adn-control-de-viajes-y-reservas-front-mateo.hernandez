import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { HttpService } from '@core/services/http.service';
import { HotelService } from '@hotel/shared/service/hotel.service';
import { DialogService } from '@shared/services/dialog.service';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBusquedaHotelComponent } from '../form-busqueda-hotel/form-busqueda-hotel.component';
import { ListarHotelComponent } from './listar-hotel.component';

describe('ListarHotelComponent', () => {
  let component: ListarHotelComponent;
  let fixture: ComponentFixture<ListarHotelComponent>;
  const user = { id: '1', nombre: 'Marcos' };
  const solicitudReserva = { idHabitacion: '1' , idHotel: '1'};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule, BrowserAnimationsModule],
      declarations: [ ListarHotelComponent, FormBusquedaHotelComponent ],
      providers: [
        HotelService,
        HttpService,
        DialogService,
        AuthService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListarHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crear correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia setear data en la busqueda', () => {
    const fechaEntrada = '2023-09-01';
    const fechaSalida = '2023-09-05';
    const ciudad = 'MEDELLIN';
    const data = [ciudad, fechaEntrada, fechaSalida];
    component.onBusqueda(data);
    expect(component.ubicacion).toBe(ciudad);
    expect(component.fechaEntrada).toBe(fechaEntrada);
    expect(component.fechaSalida).toBe(fechaSalida);
  });

  it('debería llamar al servicio de reserva cuando se confirma la reserva', () => {
    const dialogService = TestBed.inject(DialogService);
    const hotelService = TestBed.inject(HotelService);

    component.user = user;

    spyOn(dialogService, 'openConfirmationDialog').and.returnValue(of('confirmado'));
    const crearSpy = spyOn(hotelService, 'crear').and.returnValue(of(null));

    component.onReservar(solicitudReserva.idHabitacion, solicitudReserva.idHotel);

    expect(crearSpy).toHaveBeenCalled();
  });


});
