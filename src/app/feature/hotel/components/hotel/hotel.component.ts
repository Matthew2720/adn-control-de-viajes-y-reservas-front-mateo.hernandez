import { Component, OnInit } from '@angular/core';
import { GenericRoutesService } from '@core/services/generic-routes.service';
import { MenuItem } from '@core/modelo/menu-item';

@Component({
  selector: 'app-hotel',
  template: '<router-outlet></router-outlet>',
  styles: [
    `
      router-outlet {
        position: relative;
        top: 10px;
        background-color: red;
      }
    `,
  ],
})
export class HotelComponent implements OnInit {
  public companies: MenuItem[] = [];

  constructor(private genericRoutesService: GenericRoutesService) { }

  ngOnInit(): void {
    this.companies = [
      {url: '/hotel/listar', nombre: 'Buscar hoteles'},
      {url: '/hotel/reservas', nombre: 'Mis reservas'},
    ];

    this.genericRoutesService.setRoutes(this.companies);
  }

}
