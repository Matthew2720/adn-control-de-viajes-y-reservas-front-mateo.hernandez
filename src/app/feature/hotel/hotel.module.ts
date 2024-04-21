import { NgModule } from '@angular/core';

import { HotelRoutingModule } from './hotel-routing.module';
import { HotelComponent } from './components/hotel/hotel.component';
import { SharedModule } from '@shared/shared.module';
import { ReservasHotelComponent } from './components/reservas-hotel/reservas-hotel.component';
import { HotelService } from './shared/service/hotel.service';
import { AnularReservaHotelService } from './shared/service/anular-reserva-hotel.service';
import { ListarHotelComponent } from './components/listar-hotel/listar-hotel.component';
import { FormBusquedaHotelComponent } from './components/form-busqueda-hotel/form-busqueda-hotel.component';

@NgModule({
  declarations: [
    HotelComponent,
    ReservasHotelComponent,
    ListarHotelComponent,
    FormBusquedaHotelComponent
  ],
  imports: [
    SharedModule,
    HotelRoutingModule
  ],
  providers: [HotelService, AnularReservaHotelService]
})
export class HotelModule { }
