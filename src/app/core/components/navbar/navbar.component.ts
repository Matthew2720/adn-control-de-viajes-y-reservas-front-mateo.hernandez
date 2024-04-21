import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';
import { GenericRoutesService } from '@core/services/generic-routes.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() items: MenuItem[];
  opened = false;
  events = [];
  routes: MenuItem[] = [];
  username?: string;

  constructor(
    private genericRoutesService: GenericRoutesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.genericRoutesService.routes$.subscribe((routes) => {
      this.routes = routes;
    });
    this.authService.user$.subscribe((user) => (this.username = user?.nombre));
  }
}
