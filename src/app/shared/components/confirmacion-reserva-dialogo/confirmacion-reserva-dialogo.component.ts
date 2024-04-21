import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion-reserva-dialogo',
  template: `
    <h1 mat-dialog-title class="title">Confirmar accion</h1>
    <div mat-dialog-content>
      <p>{{data.message}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No</button>
      <button mat-button [mat-dialog-close]="'confirmado'" cdkFocusInitial>Sí</button>
    </div>
  `,
  styleUrls: ['./confirmacion-reserva-dialogo.component.scss']
})
export class ConfirmacionReservaDialogoComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmacionReservaDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

interface DialogData {
  message: string;
}
