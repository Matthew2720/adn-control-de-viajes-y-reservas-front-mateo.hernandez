import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VueloComponent } from './components/vuelo/vuelo.component';
import { ListarVueloComponent } from './components/listar-vuelo/listar-vuelo.component';
import { ReservasComponent } from './components/reservas/reservas.component';

const routes: Routes = [
  {
    path: '',
    component: VueloComponent,
    children: [
      {
        path: 'listar',
        component: ListarVueloComponent
      },
      {
        path: 'reservas',
        component: ReservasComponent
      },
      {
        path: '**',
        component: ListarVueloComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VueloRoutingModule { }
