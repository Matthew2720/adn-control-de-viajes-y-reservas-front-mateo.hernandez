import { Component, Output, EventEmitter } from '@angular/core';
import { ToastService } from '@shared/services/toast.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-busqueda',
  templateUrl: './form-busqueda.component.html',
  styleUrls: ['./form-busqueda.component.scss'],
})
export class FormBusquedaComponent {
  @Output() busqueda = new EventEmitter<string[]>();

  form: FormGroup;
  ciudades = ['MEDELLIN', 'BOGOTA', 'CALI', 'CARTAGENA', 'BUCARAMANGA'];

  constructor(private fb: FormBuilder, private toastService: ToastService) {
    this.form = this.fb.group({
      ciudadOrigen: ['', Validators.required],
      ciudadDestino: [''],
      pasajeros: [1, Validators.min(1)],
    });
  }

  get ciudadOrigen() {
    return this.form.get('ciudadOrigen');
  }

  get ciudadDestino() {
    return this.form.get('ciudadDestino');
  }

  get pasajeros() {
    return this.form.get('pasajeros');
  }

  onSubmit() {
    if (this.form.valid) {
      const values = this.form.value;

      const data: string[] = [
        values.ciudadOrigen,
        values.ciudadDestino,
        values.pasajeros,
      ];

      this.busqueda.emit(data);
    } else {
      this.toastService.show(
        'Revisa los campos con datos obligatorios',
        'error'
      );
      this.form.markAllAsTouched();
    }
  }
}
