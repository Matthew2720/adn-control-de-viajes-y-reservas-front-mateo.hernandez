import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import { SharedModule } from '@shared/shared.module';
import { CustomToastComponent } from './custom-toast.component';

describe('CustomToastComponent', () => {
  let component: CustomToastComponent;
  let fixture: ComponentFixture<CustomToastComponent>;
  let snackBarRef: MatSnackBarRef<CustomToastComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomToastComponent],
      imports: [ SharedModule ],
      providers: [
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: {
            message: 'Test message',
            icon: 'check_circle',
            action: 'Cerrar',
          },
        },
        {
          provide: MatSnackBarRef,
          useValue: jasmine.createSpyObj('MatSnackBarRef', ['dismiss']),
        },
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(CustomToastComponent);
    component = fixture.componentInstance;
    snackBarRef = TestBed.inject(MatSnackBarRef);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss the toast when calling dismiss()', () => {
    component.dismiss();
    expect(snackBarRef.dismiss).toHaveBeenCalled();
  });
});
