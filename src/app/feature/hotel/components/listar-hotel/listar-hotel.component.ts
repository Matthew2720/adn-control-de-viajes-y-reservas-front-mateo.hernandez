import { Component, OnInit } from '@angular/core';
import { User } from '@core/modelo/user';
import { DialogService } from '@shared/services/dialog.service';
import { ToastService } from '@shared/services/toast.service';
import { AuthService } from '@core/services/auth.service';
import { HotelService } from '@hotel/shared/service/hotel.service';
import { Observable } from 'rxjs';
import { Hotel } from '@hotel/shared/model/hotel';

@Component({
  selector: 'app-listar-hotel',
  templateUrl: './listar-hotel.component.html',
  styleUrls: ['./listar-hotel.component.scss'],
})
export class ListarHotelComponent implements OnInit {
  user: User;
  dataSource$ = new Observable<Hotel[]>();
  fechaEntrada: string;
  fechaSalida: string;
  ubicacion: string;

  constructor(
    private authService: AuthService,
    private hotelService: HotelService,
    private dialogService: DialogService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  onBusqueda(data: string[]) {
    const [ubicacionRecibida, fechaEntradaRecibida, fechaSalidaRecibida] = data;
    this.ubicacion = ubicacionRecibida;
    this.fechaEntrada = fechaEntradaRecibida;
    this.fechaSalida = fechaSalidaRecibida;
    this.dataSource$ = this.hotelService.obtenerPorUbicacion(ubicacionRecibida);
  }

  onReservar(idHabitacion: string, idHotel: string) {
    const mensaje = '¿Estas seguro que deseas reservar?';
    this.dialogService.openConfirmationDialog(mensaje).subscribe((result) => {
      if (result === 'confirmado') {
        this.hotelService
          .crear(
            this.user.id,
            idHotel,
            idHabitacion,
            this.fechaEntrada,
            this.fechaSalida
          )
          .subscribe({
            next: () => {
              this.toastService.show('Reserva realizada con exito');
              this.dataSource$ = this.hotelService.obtenerPorUbicacion(this.ubicacion);
            },
            error: (error) => {
              if (error.error.nombreExcepcion === 'ExcepcionValorInvalido') {
                this.toastService.show('La fecha no debe ser anterior a la fecha actual','error');
              } else {
                this.toastService.show(
                  'Hubo un error al realizar la reserva, intenta nuevamente mas tarde','error'
                );
              }
            },
          });
      }
    });
  }
}
