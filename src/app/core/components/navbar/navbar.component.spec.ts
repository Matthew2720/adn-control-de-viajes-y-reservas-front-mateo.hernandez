import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule, RouterTestingModule],
      declarations: [NavbarComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: of({ get: () => '1' }),
            },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crear correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia actualizar correctamente el username cuando cambie el input', () => {
    component.username = 'Test';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.username').textContent).toContain('Test');
  });

  it('deberia mostrar elementos del menu correcamente', () => {
    component.routes = [{ nombre: 'Test', url: '/test' }];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.vertical-menu-item').textContent).toContain(
      'Test'
    );
  });

  it('deberia mostrar username correcamente', () => {
    component.username = 'Test';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.username').textContent).toContain('Test');
  });
});
