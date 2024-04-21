import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmacionReservaDialogoComponent } from './confirmacion-reserva-dialogo.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


describe('ConfirmacionReservaDialogoComponent', () => {
  let component: ConfirmacionReservaDialogoComponent;
  let fixture: ComponentFixture<ConfirmacionReservaDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [SharedModule, BrowserAnimationsModule],
      declarations: [ ConfirmacionReservaDialogoComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConfirmacionReservaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
