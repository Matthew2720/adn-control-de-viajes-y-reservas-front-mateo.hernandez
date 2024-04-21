import { Injectable } from '@angular/core';
import { User } from '@core/modelo/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  private isAuthenticated = false;
  private user: User;
  private userSubject = new BehaviorSubject<User>(null);

  private usernameList: User[] = [
    { id: '1', nombre: 'Carlos' },
    { id: '2', nombre: 'Arturo' },
    { id: '3', nombre: 'Valentina' },
    { id: '4', nombre: 'Maria' },
    { id: '5', nombre: 'Martin' },
  ];

  constructor(private router: Router){
    this.user$ = this.userSubject.asObservable();
  }

  login(username: string, password: string): boolean {

    const userFound = this.usernameList.find( user => user.nombre === username);

    if (userFound && password === 'Ceiba2023') {
      this.isAuthenticated = true;
      this.user = userFound;
      this.userSubject.next(userFound);
      this.router.navigate(['/vuelo']);
      return true;
    } else {
      this.isAuthenticated = false;
      this.user = null;
      return false;
    }
  }


  logout() {
    this.isAuthenticated = false;
    this.user = null;
    this.userSubject.next(null);
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }
}
