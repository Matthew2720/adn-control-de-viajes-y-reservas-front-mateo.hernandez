import { Injectable } from '@angular/core';
import { DialogService } from '@shared/services/dialog.service';
import { HotelService } from './hotel.service';
import { ToastService } from '@shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class AnularReservaHotelService {

  constructor(
    private dialogService: DialogService,
    private hotelService: HotelService,
    private toast: ToastService
  ) { }

  anular(idReserva: string) {
    const mensaje = '¿Estás seguro que deseas anular tu reserva?';

    this.dialogService.openConfirmationDialog(mensaje).subscribe({
      next: (result) => this.handleConfirmationResult(result, idReserva),
    });
  }

  private handleConfirmationResult(result: string, idReserva: string) {
    if (result === 'confirmado') {
      this.anularReserva(idReserva);
    }
  }

  private anularReserva(idReserva: string) {
    this.hotelService.anular(idReserva).subscribe({
      next: () => this.handleAnulacionExitosa(),
      error: (error) => this.handleAnulacionError(error),
    });
  }

  private handleAnulacionExitosa() {
    this.toast.show('Reserva anulada exitosamente');
  }

  private handleAnulacionError(error: HttpErrorResponse) {
    if (error.error.nombreExcepcion === 'ExcepcionCancelacionNoDisponible') {
      this.toast.show(error.error.mensaje, 'error');
    } else {
      this.toast.show('Hubo un error al anular la reserva, intenta de nuevo más tarde', 'error');
    }
  }
}
