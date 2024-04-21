import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';
import { HomeComponent } from '@home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: HomeComponent},
  { path: 'vuelo', loadChildren: () => import('@vuelo/vuelo.module').then(mod => mod.VueloModule), canActivate: [SecurityGuard] },
  { path: 'hotel', loadChildren: () => import('@hotel/hotel.module').then(mod => mod.HotelModule), canActivate: [SecurityGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
