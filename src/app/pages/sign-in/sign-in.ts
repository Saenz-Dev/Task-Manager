import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { LoginService } from '../../services/login.service';
import { NotificationService } from '../../services/notification.service';


@Component({
  standalone: true,
  selector: 'app-sign-in',
  imports: [NzFormModule, FormsModule, ReactiveFormsModule, RouterLink, NzInputModule, NzButtonModule, NzIconModule, NzGridModule],
  templateUrl: './sign-in.html',
  styles: `
  .wrap-password {border-radius: 10px;}
  .formItemPassword {margin-bottom: 10px;}
  .textForgetPassword { color: rgb(170, 170, 170) !important;font-weight: 500;}
  .textForgetPassword:hover { color: rgb(114, 153, 77) !important; text-decoration: underline;}
  .nz-row-textForgetPassword { margin-bottom: 20px;}
  `
})
export class SignIn {
  loginForm: FormGroup;
  fb = inject(NonNullableFormBuilder);
  isLoading = false;
  loginError = '';
  private _router = inject(Router);
  private _loginService = inject(LoginService);
  private _notificationService = inject(NotificationService);

  constructor() {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]]
    })
  }

  iniciarSesion() {
    this.loginError = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this._notificationService.warning('Completa correo y contraseña para iniciar sesión.');
      return;
    }

    const correo = this.loginForm.value.correo;
    const contrasena = this.loginForm.value.contrasena;

    this.isLoading = true;

    this._loginService.login({ correo, contrasena }, true).subscribe(
      (result: any) => {
        this._loginService.setIdentity(result.usuario);
        this._loginService.setToken(result.token);
        this._notificationService.success('Inicio de sesión correcto.');
        setTimeout(() => {
          this._router.navigate(['/home-tasks']);
        })

      },
      error => {
        this.loginError = 'No fue posible obtener el token de sesión.';
        this._notificationService.error(error.error.data);
      }
    );
  }
}
