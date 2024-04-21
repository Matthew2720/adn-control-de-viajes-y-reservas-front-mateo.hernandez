import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({ template: '' })
class DummyComponent {}

describe('AuthService', () => {
  let service: AuthService;
  const username = 'Carlos';
  const password = 'Ceiba2023';
  const wrongPassword = 'wrongPassword';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DummyComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'vuelo', component: DummyComponent },
        ]),
      ],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
  });

  it('debería establecer isAuthenticated en verdadero cuando el inicio de sesión es exitoso', () => {
    service.login(username, password);
    expect(service.getIsAuthenticated()).toBeTrue();
  });

  it('debería establecer isAuthenticated en falso cuando el inicio de sesión falla', () => {
    service.login(username, wrongPassword);
    expect(service.getIsAuthenticated()).toBeFalse();
  });

  it('debería establecer user al valor correcto cuando el inicio de sesión es exitoso', () => {
    service.login(username, password);
    expect(service.getUser()).toEqual({ id: '1', nombre: username });
  });

  it('debería establecer user en null cuando el inicio de sesión falla', () => {
    service.login(username, wrongPassword);
    expect(service.getUser()).toBeNull();
  });

  it('debería establecer isAuthenticated en falso cuando se llama a la función de cierre de sesión', () => {
    service.login(username, password);
    service.logout();
    expect(service.getIsAuthenticated()).toBeFalse();
  });

  it('debería establecer user en nulo cuando se llama a la función de cierre de sesión', () => {
    service.login(username, password);
    service.logout();
    expect(service.getUser()).toBeNull();
  });
});
