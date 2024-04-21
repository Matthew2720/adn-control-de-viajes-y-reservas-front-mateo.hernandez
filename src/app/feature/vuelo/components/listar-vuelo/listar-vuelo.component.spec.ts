import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VueloService } from '@vuelo/shared/service/vuelo.service';
import { DialogService } from '@shared/services/dialog.service';
import { Overlay } from '@angular/cdk/overlay';
import { MAT_DIALOG_SCROLL_STRATEGY, MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { HttpService } from '@core-service/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '@core/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { FormBusquedaComponent } from '../form-busqueda/form-busqueda.component';
import { FormBuilder } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastService } from '@shared/services/toast.service';

import { ListarVueloComponent } from './listar-vuelo.component';

describe('ListarVueloComponent', () => {
  let component: ListarVueloComponent;
  let fixture: ComponentFixture<ListarVueloComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  const user = { id: '1', nombre: 'Marcos' };

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUser']);
    authServiceSpy.getUser.and.returnValue(user);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatCardModule, SharedModule, BrowserAnimationsModule],
      declarations: [ListarVueloComponent, FormBusquedaComponent],
      providers: [
        VueloService,
        HttpService,
        DialogService,
        MatDialog,
        Overlay,
        FormBuilder,
        ToastService,
        { provide: AuthService, useValue: authServiceSpy },
        {
          provide: MAT_DIALOG_SCROLL_STRATEGY,
          useValue: undefined,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarVueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crear correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia obtener datos del usuario en el onInit', () => {
    expect(component.user).toEqual(user);
  });

  it('deberia llamar a buscar del servicio con parametros correctos', () => {
    const vueloService = TestBed.inject(VueloService);
    const busqueda: string[] = ['BOGOTA', 'MEDELLIN', '2'];
    spyOn(vueloService, 'buscar').and.returnValue(of([]));

    component.onBusqueda(busqueda);

    expect(vueloService.buscar).toHaveBeenCalledWith(busqueda[0], busqueda[1], busqueda[2]);
  });


  it('deberia llamar a crear del servicio cuando se confirma la reserva', () => {
    const vueloService = TestBed.inject(VueloService);
    const dialogService = TestBed.inject(DialogService);
    const idReserva = '1';
    const reserva = {idCliente: '1', idVuelo: '1', pasajeros: '1'};

    spyOn(vueloService, 'crear').and.returnValue(of({}));
    spyOn(dialogService, 'openConfirmationDialog').and.returnValue(of('confirmado'));

    component.onReservar(idReserva);

    expect(vueloService.crear).toHaveBeenCalledWith(reserva.idCliente, reserva.idVuelo, reserva.pasajeros);
  });

  it('deberia mostrar un toast cuando se crea una reserva', () => {
    const vueloService = TestBed.inject(VueloService);
    const dialogService = TestBed.inject(DialogService);
    const toastService = TestBed.inject(ToastService);
    spyOn(vueloService, 'crear').and.returnValue(of({}));
    spyOn(dialogService, 'openConfirmationDialog').and.returnValue(of('confirmado'));
    spyOn(toastService, 'show');

    component.onReservar('1');

    expect(toastService.show).toHaveBeenCalledWith('Reserva realizada con exito');
  });
});
