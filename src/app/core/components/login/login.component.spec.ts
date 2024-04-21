import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '@shared/shared.module';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@shared/services/toast.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule],
      declarations: [ LoginComponent ],
      providers: [
        AuthService,
        ToastService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crear', () => {
    expect(component).toBeTruthy();
  });

  it('deberia mostrar un toast cuando el login falle', () => {
    const toastService = TestBed.inject(ToastService);

    spyOn(toastService, 'show');
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'login').and.returnValue(false);

    component.loginForm.setValue({ username: 'test', password: 'test' });
    component.onSubmit();

    expect(toastService.show).toHaveBeenCalledWith('Usuario y/o contraseña errado', 'error');
  });
});
