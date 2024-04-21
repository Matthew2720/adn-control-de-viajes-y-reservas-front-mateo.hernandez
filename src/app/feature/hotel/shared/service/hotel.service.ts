import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { map, Observable } from 'rxjs';
import { ReservaHotelDTO, ReservaResponse } from '../model/reservahotel';
import { environment } from 'src/environments/environment';

import { Hotel } from '../model/hotel';

@Injectable()
export class HotelService {

  constructor(protected http: HttpService) { }

  public obtenerReservas(idCliente: string): Observable<ReservaHotelDTO[]> {
    return this.http.doGet(`${environment.endpoint}/reservas/hotel/${idCliente}`)
      .pipe(
        map((response: ReservaResponse[]) => response.map((reserva) => ({
          id: reserva.id,
          fechaEntrada: reserva.fechaEntrada,
          fechaSalida: reserva.fechaSalida,
          nombreHotel: reserva.hotel.nombre,
          ubicacion: reserva.hotel.ubicacion,
          numeroHabitacion: reserva.habitacion.numeroHabitacion,
          costoTotal: reserva.costoTotal,
          estado: reserva.estado
        }) as ReservaHotelDTO))
      );
  }

  public anular(idReserva: string){
    return this.http.doDelete(`${environment.endpoint}/reservahotel/cancelar/${idReserva}`);
  }

  public obtenerPorUbicacion(ubicacionFiltrada: string){
    return this.http.doGet(`${environment.endpoint}/hoteles`)
      .pipe(
        map((response: Hotel[]) => response ),
        map(hoteles => hoteles.filter(hotel =>
          hotel.ubicacion === ubicacionFiltrada
        ))
      );
  }

  public crear(idCliente: string, idHotel: string, idHabitacion: string, fechaEntrada: string, fechaSalida: string){
    const reserva = {idCliente, idHotel, idHabitacion, fechaEntrada, fechaSalida};

    return this.http.doPost(`${environment.endpoint}/reservahotel`, reserva);
  }
}
