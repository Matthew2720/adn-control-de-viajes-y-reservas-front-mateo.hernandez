import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItem } from '@core/modelo/menu-item';

@Injectable({
  providedIn: 'root'
})
export class GenericRoutesService {
  routes$: Observable<MenuItem[]>;

  private routesSubject = new BehaviorSubject<MenuItem[]>([]);

  constructor() {
    this.routes$ = this.routesSubject.asObservable();
  }

  setRoutes(routes: MenuItem[]): void {
    this.routesSubject.next(routes);
  }
}



