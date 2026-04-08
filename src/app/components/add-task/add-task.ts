import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NotificationService } from '../../services/notification.service';
import { TareasService } from '../../services/tareas.service';
import { LoginService } from '../../services/login.service';
import { Tarea } from '../../models/tarea';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../models/categoria';

@Component({
  selector: 'app-add-task',
  imports: [CommonModule, ReactiveFormsModule, NzButtonModule, NzFormModule, NzInputModule, NzSelectModule, NzDatePickerModule, NzAlertModule, NzModalModule, NzGridModule, NzIconModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css'
})
export class AddTask {

  tareaForm: FormGroup;
  isOpen = signal(false);
  categorias: Categoria[] = [];
  private fb = inject(FormBuilder);
  private _notificationService = inject(NotificationService);
  private _tareasService = inject(TareasService);
  private _loginService = inject(LoginService);
  private _categoriasService = inject(CategoriasService)

  constructor() {
    this.tareaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      prioridad: ['', Validators.required],
      fechaCreacion: [{ value: null, disabled: true }, Validators.required],
      fechaVencimiento: ['', Validators.required]
    }, {
      validators: this.validarFechas
    });

    this.setFechaCreacionHoy();
    this.cargarCategorias();

  }

  cargarCategorias(): void {
    this._categoriasService.getCategorias().subscribe({
      next: (result: any) => {
        this.categorias = Array.isArray(result) ? result : (result?.data ?? []);
      },
      error: () => {
        this.categorias = [];
        this._notificationService.warning('No fue posible cargar categorías');
      }
    });
  }

  togglePanel() {
    this.isOpen.update(value => {
      const next = !value;
      if (next) {
        this.setFechaCreacionHoy();
      }
      return next;
    });
  }

  private setFechaCreacionHoy(): void {
    this.tareaForm.get('fechaCreacion')?.setValue(new Date());
    this.tareaForm.get('fechaCreacion')?.disable({ emitEvent: false });
  }

  disabledFechaVencimiento = (current: Date): boolean => {
    const hoy = this.startOfDay(new Date());
    return this.startOfDay(current) < hoy;
  };

  private startOfDay(fecha: Date): Date {
    const date = new Date(fecha);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  validarFechas(control: AbstractControl) {
    const fechaCreacion = control.get('fechaCreacion')?.value;
    const fechaVencimiento = control.get('fechaVencimiento')?.value;

    if (!fechaCreacion || !fechaVencimiento) {
      return null;
    }

    const f1 = this.startOfDay(new Date(fechaCreacion));
    const f2 = this.startOfDay(new Date(fechaVencimiento));

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
    console.log('Formulario válido, creando tarea...');
    const nuevaTarea = this.formarTarea();
    this.postTarea(nuevaTarea);
    
  }

  formarTarea(): Tarea {
    const values = this.tareaForm.getRawValue();
    const identity = this._loginService.getIdentity();
    console.log('Identity obtenida del LoginService:', identity);
    const userId = Number(identity?.id_usuario ?? 0);
    console.log('Formando tarea con valores:', values, 'y userId:', userId);

    const fechaCreacion = this.startOfDay(new Date(values.fechaCreacion));
    const fechaVencimiento = this.startOfDay(new Date(values.fechaVencimiento));

    const nuevaTarea = new Tarea(
      0,
      values.titulo,
      values.descripcion,
      fechaCreacion,
      fechaVencimiento,
      'pendiente',
      userId,
      Number(values.categoria),
      values.prioridad
    );
    return nuevaTarea;
  }

  postTarea(tarea: Tarea): void {
    this._tareasService.postTarea(tarea).subscribe(
      (result: any) => {
        console.log('Tarea creada exitosamente');
        this._tareasService.notificarRecargaTareas();
        this._notificationService.success('Tarea creada correctamente');
        this.tareaForm.reset();
        this.setFechaCreacionHoy();
        this.isOpen.set(false);
      },
      (error: any) => {
        this._notificationService.error('No fue posible crear la tarea');
      }
    );

  }

}
