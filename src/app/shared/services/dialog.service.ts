import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionReservaDialogoComponent } from '@shared/components/confirmacion-reserva-dialogo/confirmacion-reserva-dialogo.component';

@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmationDialog(message: string) {
    const dialogRef = this.dialog.open(ConfirmacionReservaDialogoComponent, {
      data: { message }
    });

    return dialogRef.afterClosed();
  }
}
