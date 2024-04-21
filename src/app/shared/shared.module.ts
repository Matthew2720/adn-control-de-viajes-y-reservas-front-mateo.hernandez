import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MensajeErrorCamposDirective } from './directivas/error-campos/directiva/mensaje-error-campos.directive';
import { MensajeErrorCamposSubmitDirective } from './directivas/error-campos/directiva/mensaje-error-campos-submit.directive';
import { MensajeErrorCamposContenedorDirective } from './directivas/error-campos/directiva/mensaje-error-campos-contenedor.directive';
import { ErrorCamposPlantillaComponent } from './directivas/error-campos/componente/error-campos-plantilla.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TrackByPipe } from './pipe/track-by.pipe';
import { MaterialModule } from './material/material.module';
import { ConfirmacionReservaDialogoComponent } from './components/confirmacion-reserva-dialogo/confirmacion-reserva-dialogo.component';
import { DialogService } from './services/dialog.service';
import { ToastService } from './services/toast.service';
import { CustomToastComponent } from './components/custom-toast/custom-toast.component';

@NgModule({
  declarations: [
    ErrorCamposPlantillaComponent,
    MensajeErrorCamposDirective,
    MensajeErrorCamposContenedorDirective,
    MensajeErrorCamposSubmitDirective,
    TrackByPipe,
    ConfirmacionReservaDialogoComponent,
    CustomToastComponent
  ],
  imports: [ReactiveFormsModule, FormsModule, MaterialModule],
  exports: [
    CommonModule,
    HttpClientModule,
    MensajeErrorCamposDirective,
    MensajeErrorCamposContenedorDirective,
    MensajeErrorCamposSubmitDirective,
    ReactiveFormsModule,
    FormsModule,
    TrackByPipe,
    MaterialModule,
  ],
  providers: [DialogService, DatePipe, ToastService]
})
export class SharedModule { }
