import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservasHotelComponent } from './components/reservas-hotel/reservas-hotel.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { ListarHotelComponent } from './components/listar-hotel/listar-hotel.component';

const routes: Routes = [
  {
    path : '',
    component: HotelComponent,
    children: [
      {
        path: 'reservas',
        component: ReservasHotelComponent
      },
      {
        path: 'listar',
        component: ListarHotelComponent
      },
      {
        path: '**',
        component: ListarHotelComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelRoutingModule { }
