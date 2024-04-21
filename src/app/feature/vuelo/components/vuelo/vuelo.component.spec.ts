import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { GenericRoutesService } from '@core/services/generic-routes.service';
import { VueloComponent } from './vuelo.component';


describe('VueloComponent', () => {
  let component: VueloComponent;
  let fixture: ComponentFixture<VueloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule],
      declarations: [VueloComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VueloComponent);
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
      {url: '/vuelo/listar', nombre: 'Buscar vuelos'},
      {url: '/vuelo/reservas', nombre: 'Mis reservas'},
    ]);
  });
});
