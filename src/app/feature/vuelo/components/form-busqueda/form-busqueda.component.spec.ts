import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '@shared/shared.module';
import { FormBusquedaComponent } from './form-busqueda.component';
import { ToastService } from '@shared/services/toast.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FormBusquedaComponent', () => {
  let component: FormBusquedaComponent;
  let fixture: ComponentFixture<FormBusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [SharedModule, BrowserAnimationsModule],
      declarations: [ FormBusquedaComponent ],
      providers: [ToastService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crear correcamente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia validar correctamente el formulario', () => {
    expect(component.form.valid).toBeFalse();

    component.ciudadOrigen.setValue('Bogota');
    component.pasajeros.setValue('2');

    expect(component.form.valid).toBeTrue();
  });

  it('deberia emitir evento de busqueda con datos correctos', () => {


    spyOn(component.busqueda, 'emit');
    component.ciudadOrigen.setValue('Bogota');
    component.ciudadDestino.setValue('Medellin');
    component.pasajeros.setValue('2');
    component.onSubmit();

    expect(component.busqueda.emit).toHaveBeenCalledWith(['Bogota', 'Medellin', '2']);
  });

  it('deberia no emitir evento de busqueda si el formulario es invalido', () => {
    const toastService = TestBed.inject(ToastService);
    spyOn(component.busqueda, 'emit');
    spyOn(toastService, 'show');

    component.onSubmit();

    expect(component.busqueda.emit).not.toHaveBeenCalled();
    expect(toastService.show).toHaveBeenCalledWith('Revisa los campos con datos obligatorios', 'error');
  });


});
