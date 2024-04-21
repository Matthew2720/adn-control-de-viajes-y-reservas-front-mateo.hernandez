import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { GenericRoutesService } from '@core/services/generic-routes.service';

import { HotelComponent } from './hotel.component';

describe('HotelComponent', () => {
  let component: HotelComponent;
  let fixture: ComponentFixture<HotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule],
      declarations: [ HotelComponent ],
      providers: [ GenericRoutesService ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crear correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia funcionar correcamente setRoutes() en OnInit', () => {
    const genericRoutesService = TestBed.inject(GenericRoutesService);
    spyOn(genericRoutesService, 'setRoutes');

    component.ngOnInit();

    expect(genericRoutesService.setRoutes).toHaveBeenCalledWith([
      {url: '/hotel/listar', nombre: 'Buscar hoteles'},
      {url: '/hotel/reservas', nombre: 'Mis reservas'},
    ]);
  });
});
