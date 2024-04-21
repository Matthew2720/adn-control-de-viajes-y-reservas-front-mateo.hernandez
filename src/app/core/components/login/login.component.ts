import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) { }

  onSubmit(){
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    const userLogged = this.authService.login(username,password);
    if (!userLogged){
      this.toastService.show('Usuario y/o contraseña errado','error');
    }
  }
}
