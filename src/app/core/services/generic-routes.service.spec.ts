import { TestBed } from '@angular/core/testing';
import { GenericRoutesService } from './generic-routes.service';
import { MenuItem } from '@core/modelo/menu-item';

describe('GenericRoutesService', () => {
  let service: GenericRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenericRoutesService],
    });
    service = TestBed.inject(GenericRoutesService);
  });

  it('deberia asignar las rutas correctamente cuando setRoutes es llamado', (done: DoneFn) => {
    const testRoutes: MenuItem[] = [
      { nombre: 'Route 1', url: '/route1' },
      { nombre: 'Route 2', url: '/route2' },
    ];
    service.setRoutes(testRoutes);
    service.routes$.subscribe((routes) => {
      expect(routes).toEqual(testRoutes);
      done();
    });
  });
});



