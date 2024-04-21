import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReservaVueloDTO, ReservaResponseVuelo } from '../model/reservavuelo';
import { Vuelo } from '../model/vuelo';

@Injectable()
export class VueloService {
  constructor(protected http: HttpService) {}

  public buscar(
    ciudadOrigen: string,
    ciudadDestino: string,
    pasajeros: string
  ) {
    const fechaMinima = this.getFechaMinima();
    const numPasajeros = +pasajeros;

    return this.http.doGet(`${environment.endpoint}/vuelos`).pipe(
      map((response: Vuelo[]) => response ),
      map((vuelos) =>
        vuelos.filter((vuelo) => {
          const fechaValida = new Date(vuelo.fechaSalida) >= fechaMinima;
          const origenValido = !ciudadOrigen || vuelo.origen === ciudadOrigen;
          const destinoValido =
            !ciudadDestino || vuelo.destino === ciudadDestino;
          const asientosSuficientes = vuelo.asientosDisponibles >= numPasajeros;
          return (
            fechaValida && origenValido && destinoValido && asientosSuficientes
          );
        })
      )
    );
  }

  public crear(idCliente: string, idVuelo: string, pasajeros: string) {
    const reserva = { idCliente, idVuelo, pasajeros };

    return this.http.doPost(`${environment.endpoint}/reserva`, reserva);
  }

  public anular(idReserva: string) {
    return this.http.doDelete(
      `${environment.endpoint}/reserva/cancelar/${idReserva}`
    );
  }

  public obtenerReservas(idCliente: string): Observable<ReservaVueloDTO[]> {
    return this.http
      .doGet(`${environment.endpoint}/reservas/vuelo/${idCliente}`)
      .pipe(
        map((response: ReservaResponseVuelo[]) =>
          response.map(
            (reserva) =>
              ({
                id: reserva.id,
                nombreCliente: reserva.cliente.nombre,
                fechaSalidaVuelo: reserva.vuelo.fechaSalida,
                fechaReserva: reserva.fechaHoraReserva,
                pasajeros: reserva.pasajeros,
                precioFinal: reserva.precioFinal,
                estadoReserva: reserva.estadoReserva,
              } as ReservaVueloDTO)
          )
        )
      );
  }

  private getFechaMinima(): Date {
    const fechaMinima = new Date();
    fechaMinima.setDate(fechaMinima.getDate() + 1);
    return fechaMinima;
  }
}
