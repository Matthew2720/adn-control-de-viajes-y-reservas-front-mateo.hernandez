import { Component, OnInit } from '@angular/core';
import { ReservaVueloDTO } from '@vuelo/shared/model/reservavuelo';
import { Observable } from 'rxjs';
import { ToastService } from '@shared/services/toast.service';

import { DialogService } from '@shared/services/dialog.service';
import { VueloService } from '@vuelo/shared/service/vuelo.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss'],
})
export class ReservasComponent implements OnInit {
  displayedColumns: string[] = [
    'fechaReserva',
    'fechaSalidaVuelo',
    'pasajeros',
    'precioFinal',
    'estadoReserva',
    'anular',
  ];

  dataSource$: Observable<ReservaVueloDTO[]>;
  idUser: string;

  constructor(
    private vueloService: VueloService,
    private authService: AuthService,
    private dialogService: DialogService,
    private toastService: ToastService
  ) {
    this.idUser = this.authService.getUser().id;
  }

  ngOnInit(): void {
    this.dataSource$ = this.vueloService.obtenerReservas(this.idUser);
  }

  onAnular(idReserva: string) {
    const mensaje = '¿Estas seguro que deseas anular tu reserva?';
    this.dialogService.openConfirmationDialog(mensaje).subscribe({
      next: (result) => {
        if (result === 'confirmado') {
          this.vueloService.anular(idReserva).subscribe({
            next: () => {
              this.dataSource$ = this.vueloService.obtenerReservas(this.idUser);
              this.toastService.show('Reserva anulada exitosamente');
            },
            error: (error) => {
              if (
                error.error.nombreExcepcion ===
                'ExcepcionCancelacionNoDisponible'
              ) {
                this.toastService.show(error.error.mensaje, 'error');
              } else {
                this.toastService.show(
                  'Hubo un error al anular la reserva, intenta de nuevo mas tarde',
                  'error'
                );
              }
            },
          });
        }
      },
    });
  }

  getStatus(estado: string) {
    if (estado === 'ACTIVA') {
      return false;
    } else {
      return true;
    }
  }
}
