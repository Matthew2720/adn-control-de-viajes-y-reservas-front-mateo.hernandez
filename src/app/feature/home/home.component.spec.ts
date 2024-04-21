import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from '@core/components/login/login.component';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    setupTestBed();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia contener LoginComponent', () => {
    const loginElement = fixture.debugElement.nativeElement.querySelector('app-login');
    expect(loginElement).toBeDefined();
  });
});

function setupTestBed() {
  TestBed.configureTestingModule({
    imports: [RouterModule, SharedModule, BrowserAnimationsModule],
    declarations: [ HomeComponent, LoginComponent ]
  })
    .compileComponents();
}
