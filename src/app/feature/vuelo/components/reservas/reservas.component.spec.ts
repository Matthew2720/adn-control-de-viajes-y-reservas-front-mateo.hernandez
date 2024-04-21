import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@core/services/auth.service';
import { HttpService } from '@core-service/http.service';
import { of } from 'rxjs';
import { ToastService } from '@shared/services/toast.service';
import { DialogService } from '@shared/services/dialog.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VueloService } from '@vuelo/shared/service/vuelo.service';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReservasComponent } from './reservas.component';


describe('ReservasComponent', () => {
  let component: ReservasComponent;
  let fixture: ComponentFixture<ReservasComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let vueloService: VueloService;
  let dialogService: DialogService;
  let toastService: ToastService;
  const idAnular = '1';

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUser']);
    authServiceSpy.getUser.and.returnValue({ id: '1', nombre: 'Marcos' });

    await TestBed.configureTestingModule({
      imports : [SharedModule, BrowserAnimationsModule, HttpClientTestingModule],
      declarations: [ ReservasComponent ],
      providers: [
        VueloService,
        DialogService,
        HttpService,
        ToastService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReservasComponent);
    component = fixture.componentInstance;
    vueloService = TestBed.inject(VueloService);
    dialogService = TestBed.inject(DialogService);
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('deberia crear correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia obtener reservas del usuario en el onInit', () => {
    spyOn(vueloService, 'obtenerReservas');

    component.ngOnInit();

    expect(vueloService.obtenerReservas).toHaveBeenCalledWith(idAnular);
  });

  it('deberia retornar getStatus() correctamente', () => {
    expect(component.getStatus('ACTIVA')).toBe(false);
    expect(component.getStatus('CANCELADO')).toBe(true);
  });

  it('deberia llamar a anular del servicio cuando se confirma la anulacion', () => {
    spyOn(vueloService, 'anular').and.returnValue(of({}));
    spyOn(dialogService, 'openConfirmationDialog').and.returnValue(of('confirmado'));

    component.onAnular(idAnular);

    expect(vueloService.anular).toHaveBeenCalledWith(idAnular);
  });

  it('deberia actualizar las reservas cuando se anula una reserva', () => {
    spyOn(vueloService, 'anular').and.returnValue(of({}));
    spyOn(dialogService, 'openConfirmationDialog').and.returnValue(of('confirmado'));
    spyOn(vueloService, 'obtenerReservas');

    component.onAnular(idAnular);

    expect(vueloService.obtenerReservas).toHaveBeenCalledWith(idAnular);
  });

  it('deberia mostrar un toast cuando se anula una reserva', () => {
    spyOn(vueloService, 'anular').and.returnValue(of({}));
    spyOn(dialogService, 'openConfirmationDialog').and.returnValue(of('confirmado'));
    spyOn(toastService, 'show');

    component.onAnular(idAnular);

    expect(toastService.show).toHaveBeenCalledWith('Reserva anulada exitosamente');
  });

});
