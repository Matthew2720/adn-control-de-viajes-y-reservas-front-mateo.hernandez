import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '@shared/shared.module';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBusquedaHotelComponent } from './form-busqueda-hotel.component';
import { ToastService } from '@shared/services/toast.service';

describe('FormBusquedaHotelComponent', () => {
  let component: FormBusquedaHotelComponent;
  let fixture: ComponentFixture<FormBusquedaHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule],
      declarations: [FormBusquedaHotelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormBusquedaHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crear correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia resetear datos cuando cambie ciudad', () => {
    component.form.controls.ciudad.setValue('MEDELLIN');
    component.form.controls.fechaEntrada.setValue(new Date());
    component.form.controls.fechaSalida.setValue(new Date());
    expect(component.form.controls.fechaEntrada.value).not.toBeNull();
    expect(component.form.controls.fechaSalida.value).not.toBeNull();
    component.form.controls.ciudad.setValue('BOGOTA');
    expect(component.form.controls.fechaEntrada.value).toBeNull();
    expect(component.form.controls.fechaSalida.value).toBeNull();
  });

  it('deberia resetear datos cuando cambie la fecha de entrada', () => {
    component.form.controls.ciudad.setValue('MEDELLIN');
    component.form.controls.fechaEntrada.setValue(new Date());
    component.form.controls.fechaSalida.setValue(new Date());
    expect(component.form.controls.fechaSalida.value).not.toBeNull();
    component.form.controls.fechaEntrada.setValue(new Date());
    expect(component.form.controls.fechaSalida.value).toBeNull();
  });

  it('debería emitir un evento de búsqueda con los datos correctos', () => {
    spyOn(component.busqueda, 'emit');
    const datePipe = TestBed.inject(DatePipe);
    const aumentoMes = 2;
    const fechaEntrada = new Date();
    fechaEntrada.setMonth(fechaEntrada.getMonth() + 1);
    const fechaSalida = new Date();
    fechaSalida.setMonth(fechaSalida.getMonth() + aumentoMes);
    spyOn(datePipe, 'transform').and.returnValues(
      datePipe.transform(fechaEntrada, 'yyyy-MM-dd HH:mm:ss'),
      datePipe.transform(fechaSalida, 'yyyy-MM-dd HH:mm:ss')
    );
    component.form.controls.ciudad.setValue('MEDELLIN');
    component.form.controls.fechaEntrada.setValue(fechaEntrada);
    component.form.controls.fechaSalida.setValue(fechaSalida);
    component.onSubmit();
    expect(component.busqueda.emit).toHaveBeenCalledWith([
      'MEDELLIN',
      datePipe.transform(fechaEntrada, 'yyyy-MM-dd HH:mm:ss'),
      datePipe.transform(fechaSalida, 'yyyy-MM-dd HH:mm:ss'),
    ]);
  });

  it('debería devolver la fecha mínima de salida correcta', () => {
    const fechaRecibida = new Date();
    component.fechaEntrada.setValue(fechaRecibida);

    const fechaSalidaMinima = component.fechaSalidaMinima;
    expect(fechaSalidaMinima).toEqual(new Date(fechaRecibida.setDate(fechaRecibida.getDate()+1)));
  });

  it('deberia mostrar un toast cuando los campos son incorrectos', () => {
    const toastService = TestBed.inject(ToastService);
    spyOn(toastService, 'show');
    component.form.setValue({
      ciudad: '',
      fechaEntrada: null,
      fechaSalida: null
    });
    component.onSubmit();
    expect(toastService.show).toHaveBeenCalledWith('Revisa los campos con datos obligatorios', 'error');
    expect(component.form.touched).toBeTrue();
  });
});
