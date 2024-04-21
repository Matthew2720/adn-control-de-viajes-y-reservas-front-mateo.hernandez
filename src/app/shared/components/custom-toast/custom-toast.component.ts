import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-toast',
  templateUrl: './custom-toast.component.html',
  styleUrls: ['./custom-toast.component.scss']
})
export class CustomToastComponent  {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: ToastData,
    private snackBarRef: MatSnackBarRef<CustomToastComponent>
  ) { }

  dismiss(){
    this.snackBarRef.dismiss();
  }

}

interface ToastData {
  message: string;
  icon: string;
  action: string;
}
