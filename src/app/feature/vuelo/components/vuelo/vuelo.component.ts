import { Component, OnInit } from '@angular/core';
import { GenericRoutesService } from '@core/services/generic-routes.service';
import { MenuItem } from '@core/modelo/menu-item';

@Component({
  selector: 'app-vuelo',
  template: '<router-outlet></router-outlet>',
  styles: [
    `
      router-outlet {
        position: relative;
        top: 10px;
      }
    `,
  ],
})
export class VueloComponent implements OnInit {
  public companies: MenuItem[] = [];

  constructor(private genericRoutesService: GenericRoutesService) {}

  ngOnInit(): void {
    this.companies = [
      { url: '/vuelo/listar', nombre: 'Buscar vuelos' },
      { url: '/vuelo/reservas', nombre: 'Mis reservas' },
    ];

    this.genericRoutesService.setRoutes(this.companies);
  }
}
