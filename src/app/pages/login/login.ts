import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzIconModule, RouterLink, NzGridModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  registerForm: FormGroup;
  fb = inject(NonNullableFormBuilder);
  esIgual = false;

  // private fb = inject(NonNullableFormBuilder);

  constructor(
    private _router: Router,
    private cdr: ChangeDetectorRef
  ) {
    // this.registerForm = this.formBuilder.group({
    //   nombre: [''],
    //   apellidos: [''],
    //   email: [''],
    //   password: [''],
    //   verifyPassword: [''],
    // });
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)]],
      verifyPassword: ['']
    }
      // {
      //   updateOn: 'change'
      // }
    );
  }

  ngOnInit() { }

  // passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  //   const password = control.get('password')?.value;
  //   const verifyPassword = control.get('verifyPassword')?.value;
  //   if (password !== verifyPassword) {
  //     return { passwordMisMatch: true };
  //   }
  //   return null;
  // }
  // resetForm(e: MouseEvent): void {
  //   e.preventDefault();
  //   this.validateForm.reset();
  // }

  // validatePasswords(): boolean {
  //   return this.password == this.verifyPassword;
  // }

  matchPasswords(event: any) {
    
      this.esIgual = this.registerForm.get('password')?.value === this.registerForm.get('verifyPassword')?.value;
    
  }

  registrarUsuario() {}
}
