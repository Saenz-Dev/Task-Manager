import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-add-task',
  imports: [CommonModule, ReactiveFormsModule, NzButtonModule, NzFormModule, NzInputModule, NzDatePickerModule, NzGridModule, NzIconModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css'
})
export class AddTask {

  tareaForm: FormGroup;
  isOpen = signal(false);
  categorias = ['Personal', 'Trabajo', 'Estudio', 'Urgente'];
  private fb = inject(FormBuilder);
  private _notificationService = inject(NotificationService);

  constructor() {
    this.tareaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      fechaVencimiento: ['', Validators.required]
    }, {
      validators: this.validarFechas
    });

  }

  togglePanel() {
    this.isOpen.update(value => !value);
  }

  validarFechas(control: AbstractControl) {

    const fechaCreacion = control.get('fechaCreacion')?.value;
    const fechaVencimiento = control.get('fechaVencimiento')?.value;

    if (!fechaCreacion || !fechaVencimiento) {
      return null;
    }

    const f1 = new Date(fechaCreacion);
    const f2 = new Date(fechaVencimiento);

    if (f2 < f1) {
      return { fechaInvalida: true };
    }

    return null;
  }

  guardarTarea() {
    if (this.tareaForm.invalid) {
      this.tareaForm.markAllAsTouched();
      this._notificationService.warning('Completa todos los campos requeridos');
      return;
    }

    console.log("Tarea guardada:", this.tareaForm.value);
    this._notificationService.success('Tarea creada correctamente');
    this.tareaForm.reset();
    this.isOpen.set(false);

    // Aquí puedes llamar a tu servicio
    // this._tareasService.crearTarea(this.tareaForm.value).subscribe(...)
  }
}
