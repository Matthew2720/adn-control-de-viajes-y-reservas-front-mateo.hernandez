import { NgModule } from '@angular/core';

import { VueloRoutingModule } from './vuelo-routing.module';
import { VueloComponent } from './components/vuelo/vuelo.component';
import { ListarVueloComponent } from './components/listar-vuelo/listar-vuelo.component';
import { SharedModule } from '@shared/shared.module';
import { FormBusquedaComponent } from './components/form-busqueda/form-busqueda.component';
import { VueloService } from './shared/service/vuelo.service';
import { ReservasComponent } from './components/reservas/reservas.component';

@NgModule({
  declarations: [
    VueloComponent,
    ListarVueloComponent,
    FormBusquedaComponent,
    ReservasComponent
  ],
  imports: [
    VueloRoutingModule,
    SharedModule,
  ],
  providers: [VueloService]
})
export class VueloModule { }
