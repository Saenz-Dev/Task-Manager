import { Component, Inject, inject, signal } from '@angular/core';

import { FormGroup, FormsModule, FormBuilder, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';


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

  constructor(
    private _router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  iniciarSesion() {
    this._router.navigate(['/home-tasks']);
  }
}
