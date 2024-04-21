import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CustomToastComponent } from '@shared/components/custom-toast/custom-toast.component';

@Injectable()
export class ToastService {
  private defaultIcon = 'check_circle';

  constructor(private snackBar: MatSnackBar) {}


  show(message: string, icon: string = this.defaultIcon, action = 'Cerrar', duration: number = tiempoToast) {
    const config: MatSnackBarConfig = {
      duration,
      panelClass: 'toast-with-icon',
      data: { message, icon, action },
    };

    const snackBarRef = this.snackBar.openFromComponent(CustomToastComponent, config);
    snackBarRef.instance.data = { message, icon, action };
    snackBarRef.onAction();
  }
}

const tiempoToast = 5000;
