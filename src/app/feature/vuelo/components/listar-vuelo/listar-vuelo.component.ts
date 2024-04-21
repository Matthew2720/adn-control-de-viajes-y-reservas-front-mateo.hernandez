import { Component, OnInit } from '@angular/core';
import { DialogService } from '@shared/services/dialog.service';
import { Observable, catchError } from 'rxjs';
import { ToastService } from '@shared/services/toast.service';

import { User } from '@core/modelo/user';
import { AuthService } from '@core/services/auth.service';

import { Vuelo } from '@vuelo/shared/model/vuelo';
import { VueloService } from '@vuelo/shared/service/vuelo.service';

@Component({
  selector: 'app-listar-vuelo',
  templateUrl: './listar-vuelo.component.html',
  styleUrls: ['./listar-vuelo.component.scss'],
})
export class ListarVueloComponent implements OnInit {
  displayedColumns: string[] = [
    'origen',
    'destino',
    'fechaSalida',
    'fechaLlegada',
    'asientosDisponibles',
    'precioBase',
    'reservar',
  ];

  user: User;
  dataSource$: Observable<Vuelo[]>;
  pasajerosReserva = '1';

  constructor(
    private authService: AuthService,
    private vueloService: VueloService,
    private dialogService: DialogService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  onBusqueda(data: string[]) {
    const [ciudadOrigen, ciudadDestino, pasajeros] = data;

    this.pasajerosReserva = pasajeros;
    this.dataSource$ = this.vueloService
      .buscar(ciudadOrigen, ciudadDestino, pasajeros)
      .pipe(
        catchError((error) => {
          this.toastService.show(error.error.nombreExcepcion, 'error');
          throw error;
        })
      );
  }

  onReservar(idVuelo: string) {
    const mensaje = '¿Estas seguro que deseas reservar?';
    this.dialogService.openConfirmationDialog(mensaje).subscribe((result) => {
      if (result === 'confirmado') {
        this.vueloService
          .crear(this.user.id, idVuelo, this.pasajerosReserva)
          .subscribe({
            next: () => {
              this.toastService.show('Reserva realizada con exito');
            },
            error: (error) => {
              if (error.error.nombreExcepcion === 'ExcepcionValorInvalido') {
                this.toastService.show(
                  'La fecha no debe ser anterior a la fecha actual',
                  'error'
                );
              } else {
                this.toastService.show(
                  'Hubo un error al realizar la reserva, intenta nuevamente mas tarde',
                  'error'
                );
              }
            },
          });
      }
    });
  }
}
