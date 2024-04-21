import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from '@shared/services/toast.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form-busqueda-hotel',
  templateUrl: './form-busqueda-hotel.component.html',
  styleUrls: ['./form-busqueda-hotel.component.scss'],
})
export class FormBusquedaHotelComponent implements OnInit{
  @Output() busqueda = new EventEmitter<string[]>();

  fechaMinima: Date;

  form: FormGroup;
  ciudades = ['MEDELLIN', 'BOGOTA', 'CALI', 'CARTAGENA', 'BUCARAMANGA'];


  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private toastService: ToastService
  ) {
    this.form = this.fb.group({
      ciudad: ['', Validators.required],
      fechaEntrada: ['', Validators.required],
      fechaSalida: ['', Validators.required]
    });
  }

  get ciudad(){
    return this.form.get('ciudad');
  }

  get fechaEntrada(){
    return this.form.get('fechaEntrada');
  }

  get fechaSalida(){
    return this.form.get('fechaSalida');
  }

  get fechaSalidaMinima() {
    const fechaEntrada = this.fechaEntrada.value;
    if (fechaEntrada) {
      const fechaSalidaMinima = new Date(fechaEntrada);
      fechaSalidaMinima.setDate(fechaSalidaMinima.getDate() + 1);
      return fechaSalidaMinima;
    }
    return this.fechaMinima;
  }

  ngOnInit(): void {
    this.form.get('ciudad').valueChanges.subscribe(() => {
      this.form.get('fechaEntrada').reset();
      this.form.get('fechaSalida').reset();
    });

    this.form.get('fechaEntrada').valueChanges.subscribe(() => {
      this.form.get('fechaSalida').reset();
    });

    this.fechaMinima = new Date();
    this.fechaMinima.setDate(this.fechaMinima.getDate() + 1);
  }

  onSubmit(){
    if(this.form.valid){
      const values = this.form.value;

      const fechaEntrada = this.datePipe.transform(values.fechaEntrada, 'yyyy-MM-dd HH:mm:ss' );
      const fechaSalida = this.datePipe.transform(values.fechaSalida, 'yyyy-MM-dd HH:mm:ss' );


      const data: string[] = [
        values.ciudad,
        fechaEntrada,
        fechaSalida
      ];

      this.busqueda.emit(data);
    } else {
      this.toastService.show('Revisa los campos con datos obligatorios', 'error');
      this.form.markAllAsTouched();
    }
  }
}
