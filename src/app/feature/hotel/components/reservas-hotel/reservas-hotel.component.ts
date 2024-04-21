import { Component, OnInit } from '@angular/core';
import { ReservaHotelDTO } from '@hotel/shared/model/reservahotel';
import { Observable } from 'rxjs';
import { HotelService } from '@hotel/shared/service/hotel.service';
import { AuthService } from '@core/services/auth.service';
import { AnularReservaHotelService } from '@hotel/shared/service/anular-reserva-hotel.service';

@Component({
  selector: 'app-reservas-hotel',
  templateUrl: './reservas-hotel.component.html',
  styleUrls: ['./reservas-hotel.component.scss'],
})
export class ReservasHotelComponent implements OnInit {
  displayedColumns: string[] = [
    'fechaEntrada',
    'fechaSalida',
    'nombreHotel',
    'ubicacion',
    'numeroHabitacion',
    'costoTotal',
    'estado',
    'anular',
  ];

  dataSource$: Observable<ReservaHotelDTO[]>;
  idUser: string;

  constructor(
    private hotelService: HotelService,
    private authService: AuthService,
    private anularReservaHotelService: AnularReservaHotelService
  ) {
    this.idUser = this.authService.getUser().id;
  }

  ngOnInit(): void {
    this.actualizarDataSource();
  }

  getStatus(estado: string) {
    if (estado === 'RESERVADO') {
      return false;
    }
    return true;
  }

  actualizarDataSource() {
    this.dataSource$ = this.hotelService.obtenerReservas(this.idUser);
  }

  onAnular(idReserva: string) {
    this.anularReservaHotelService.anular(idReserva);
    this.actualizarDataSource();
  }
}
