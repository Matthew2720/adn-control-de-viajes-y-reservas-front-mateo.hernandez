import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { MAT_DIALOG_SCROLL_STRATEGY } from '@angular/material/dialog';
import { HttpService } from '@core/services/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from '@shared/shared.module';
import { AnularReservaHotelService } from './anular-reserva-hotel.service';
import { DialogService } from '@shared/services/dialog.service';
import { HotelService } from './hotel.service';
import { ToastService } from '@shared/services/toast.service';
import { of, throwError } from 'rxjs';

describe('AnularReservaHotelService', () => {
  let service: AnularReservaHotelService;
  let dialogService: jasmine.SpyObj<DialogService>;
  let hotelService: jasmine.SpyObj<HotelService>;
  let toastService: jasmine.SpyObj<ToastService>;
  const errorMessage = 'Error al anular reserva';
  const mensajeConfirmacion = '¿Estás seguro que deseas anular tu reserva?';
  const idReserva = '123';

  beforeEach(() => {
    dialogService = jasmine.createSpyObj('DialogService', [
      'openConfirmationDialog',
    ]);
    dialogService.openConfirmationDialog.and.returnValue(of('confirmado'));
    hotelService = jasmine.createSpyObj('HotelService', ['anular']);
    toastService = jasmine.createSpyObj('ToastService', ['show']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AnularReservaHotelService,
        SharedModule,
        HttpService,
        MatDialog,
        MatSnackBar,
        Overlay,
        {
          provide: MAT_DIALOG_SCROLL_STRATEGY,
          useValue: undefined,
        },
        { provide: DialogService, useValue: dialogService },
        { provide: HotelService, useValue: hotelService },
        { provide: ToastService, useValue: toastService },
      ],
    });
    service = TestBed.inject(AnularReservaHotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should anular reservation when confirmation result is "confirmado"', () => {
    const mensajeAnulacionExitosa = 'Reserva anulada exitosamente';
    hotelService.anular.and.returnValue(of({}));

    service.anular(idReserva);

    expect(dialogService.openConfirmationDialog).toHaveBeenCalledOnceWith(
      mensajeConfirmacion
    );
    expect(hotelService.anular).toHaveBeenCalledOnceWith(idReserva);
    expect(toastService.show).toHaveBeenCalledWith(mensajeAnulacionExitosa);
  });

  it('should show error toast on anulacion error', () => {
    const errorResponse = {
      error: {
        nombreExcepcion: 'ExcepcionCancelacionNoDisponible',
        mensaje: errorMessage,
      },
    };
    hotelService.anular.and.returnValue(throwError(errorResponse));

    service.anular(idReserva);

    expect(dialogService.openConfirmationDialog).toHaveBeenCalledOnceWith(
      mensajeConfirmacion
    );
    expect(hotelService.anular).toHaveBeenCalledOnceWith(idReserva);
    expect(toastService.show).toHaveBeenCalledWith(errorMessage, 'error');
  });

  it('should show generic error toast on anulacion error', () => {
    const mensajeErrorAnulacion =
      'Hubo un error al anular la reserva, intenta de nuevo más tarde';
    const errorResponse = {
      error: {
        nombreExcepcion: 'OtroError',
        mensaje: errorMessage,
      },
    };
    hotelService.anular.and.returnValue(throwError(errorResponse));

    service.anular(idReserva);

    expect(dialogService.openConfirmationDialog).toHaveBeenCalledOnceWith(
      mensajeConfirmacion
    );
    expect(hotelService.anular).toHaveBeenCalledOnceWith(idReserva);
    expect(toastService.show).toHaveBeenCalledWith(
      mensajeErrorAnulacion,
      'error'
    );
  });

  it('should do nothing on cancel confirmation', () => {
    dialogService.openConfirmationDialog.and.returnValue(of('cancelado'));

    service.anular(idReserva);

    expect(dialogService.openConfirmationDialog).toHaveBeenCalledOnceWith(
      mensajeConfirmacion
    );
    expect(hotelService.anular).not.toHaveBeenCalled();
    expect(toastService.show).not.toHaveBeenCalled();
  });
});
