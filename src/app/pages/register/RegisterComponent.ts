import { Component, inject } from '@angular/core';
import { AsyncValidatorFn, AbstractControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  standalone: true,
  selector: 'register',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzIconModule, RouterLink, NzGridModule],
  templateUrl: './RegisterComponent.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  fb = inject(NonNullableFormBuilder);
  esIgual = false;

  constructor(
    private _router: Router,
    private _usuariosService: UsuariosService,
    private _notificationService: NotificationService
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email], [this.validarCorreoDuplicado()]],
      contrasena: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)]],
      verifyPassword: ['']
    },
      {
        validators: this.validarMatchPasswords
      }
    );
  }

  ngOnInit() { }

  matchPasswords(event: any) {
    this.esIgual = this.registerForm.get('contrasena')?.value === this.registerForm.get('verifyPassword')?.value;
  }

  validarCorreoDuplicado(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {

      let correo = control.value;
      if (!correo) {
        return of(null);
      }
      correo = correo.toString().trim().toLowerCase();
      return this._usuariosService.getUsuarios().pipe(
        map((response: any) => {
          let usuarios = [];
          if (Array.isArray(response)) {
            usuarios = response;
          } else if (response && response.data) {
            usuarios = response.data;
          }
          // Recorrer usuarios
          for (let i = 0; i < usuarios.length; i++) {
            let correoUsuario = usuarios[i].correo;

            if (correoUsuario) {
              correoUsuario = correoUsuario.toString().trim().toLowerCase();

              if (correoUsuario === correo) {
                return { correoDuplicado: true };
              }
            }
          }
          return null;
        }),
        catchError(() => of(null))
      );
    };
  }

  registrarUsuario() {
    if (this.registerForm.invalid || this.registerForm.pending) {
      this.registerForm.markAllAsTouched();
      this._notificationService.warning('Completa correctamente los campos requeridos.');
      return;
    }

    const { nombre, apellidos, correo, contrasena } = this.registerForm.getRawValue();
    const nombreCompleto = `${nombre} ${apellidos}`.trim();
    const usuario = new Usuario(0, nombreCompleto, correo, contrasena, new Date());

    this._usuariosService.postUsuarios(usuario).subscribe({
      next: () => {
        this._notificationService.success('Usuario registrado correctamente.');
        this.registerForm.reset();
        this._router.navigate(['/sign-in']);
      },
      error: (error) => {
        console.error('Error al registrar usuario:', error);
        this._notificationService.error('No fue posible registrar el usuario.');
      }
    });
  }

  validarMatchPasswords(control: AbstractControl): ValidationErrors | null {
    const contrasena = control.get('contrasena')?.value;
    const verifyPassword = control.get('verifyPassword')?.value;

    if (contrasena !== verifyPassword) {
      console.log('si hay error');
      return { noIguales: true };
    }
    return null;
  }


}
