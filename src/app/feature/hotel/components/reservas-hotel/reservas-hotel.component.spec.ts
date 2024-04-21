import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnularReservaHotelService } from '@hotel/shared/service/anular-reserva-hotel.service';
import { AuthService } from '@core/services/auth.service';
import { HttpService } from '@core-service/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HotelService } from '@hotel/shared/service/hotel.service';
import { DialogService } from '@shared/services/dialog.service';
import { ToastService } from '@shared/services/toast.service';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReservasHotelComponent } from './reservas-hotel.component';


describe('ReservasHotelComponent', () => {
  let component: ReservasHotelComponent;
  let fixture: ComponentFixture<ReservasHotelComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  const user = { id: '1', nombre: 'Marcos' };

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUser']);
    authServiceSpy.getUser.and.returnValue(user);

    await TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule, HttpClientTestingModule],
      declarations: [ReservasHotelComponent],
      providers: [
        HttpService,
        HotelService,
        DialogService,
        AnularReservaHotelService,
        ToastService,
        { provide: AuthService, useValue: authServiceSpy },

      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservasHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crear correcamente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia obtener reservas del usuario en el onInit', () => {
    const hotelService = TestBed.inject(HotelService);
    const idUser = '1';
    spyOn(hotelService, 'obtenerReservas');

    component.ngOnInit();

    expect(hotelService.obtenerReservas).toHaveBeenCalledWith(idUser);
  });

  it('deberia retornar getStatus() correctamente', () => {
    expect(component.getStatus('RESERVADO')).toBe(false);
    expect(component.getStatus('CANCELADO')).toBe(true);
  });

  it('should call anularReservaHotelService.anular and update data source', () => {
    const idReserva = '123';
    component.ngOnInit();

    component.onAnular(idReserva);
    expect(component.dataSource$).toBeDefined();
  });

});
