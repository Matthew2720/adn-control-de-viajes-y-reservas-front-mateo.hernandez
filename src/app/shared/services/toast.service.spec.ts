import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SharedModule } from '@shared/shared.module';
import { ToastService } from './toast.service';
import { CustomToastComponent } from '@shared/components/custom-toast/custom-toast.component';

describe('ToastService', () => {
  let service: ToastService;
  let snackBar: MatSnackBar;
  const message = 'Test message';
  const icon = 'check_circle';
  const action = 'Cerrar';
  const duration = 5000;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [ToastService, MatSnackBar],
    });
    service = TestBed.inject(ToastService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('deberia crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('deberia llamar snackBar.openFromComponent con la configuracion correcta', () => {
    const config: MatSnackBarConfig = {
      duration,
      panelClass: 'toast-with-icon',
      data: { message, icon, action },
    };
    const snackBarRef = jasmine.createSpyObj('MatSnackBarRef', ['onAction']);
    snackBarRef.instance = jasmine.createSpyObj('CustomToastComponent', [
      'data',
    ]);
    spyOn(snackBar, 'openFromComponent').and.returnValue(snackBarRef);
    service.show(message, icon, action, duration);
    expect(snackBar.openFromComponent).toHaveBeenCalledWith(
      CustomToastComponent,
      config
    );
    expect(snackBarRef.instance.data).toEqual({ message, icon, action });
    expect(snackBarRef.onAction).toHaveBeenCalled();
  });

  it('deberia llamar snackBarRef.instance.data con los datos correctos', () => {
    const snackBarRef = jasmine.createSpyObj('MatSnackBarRef', ['onAction']);
    snackBarRef.instance = jasmine.createSpyObj('CustomToastComponent', [
      'data',
    ]);
    spyOn(snackBar, 'openFromComponent').and.returnValue(snackBarRef);
    service.show(message, icon, action, duration);
    expect(snackBarRef.instance.data).toEqual({ message, icon, action });
    expect(snackBarRef.onAction).toHaveBeenCalled();
  });
});
