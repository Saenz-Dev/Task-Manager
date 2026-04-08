import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { Tarea } from '../../models/tarea';
import { Categoria } from '../../models/categoria';

@Component({
  selector: 'app-edit-task',
  imports: [ReactiveFormsModule, NzModalModule, NzFormModule, NzInputModule, NzSelectModule, NzDatePickerModule, NzAlertModule, NzButtonModule, NzGridModule],
  templateUrl: './edit-task.html',
  styleUrl: './edit-task.css'
})
export class EditTask implements OnChanges {
  @Input() visible = false;
  @Input() tarea: Tarea | null = null;
  @Input() categorias: Categoria[] = [];

  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<Tarea>();

  private readonly fb = inject(FormBuilder);

  editForm: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    id_categoria: [null, Validators.required],
    prioridad: ['', Validators.required],
    fecha_creacion: [{ value: null, disabled: true }, Validators.required],
    fecha_vencimiento: [null, Validators.required]
  }, {
    validators: this.validarFechas
  });

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['visible'] || changes['tarea']) && this.visible && this.tarea) {
      this.editForm.reset({
        titulo: this.tarea.titulo,
        descripcion: this.tarea.descripcion,
        id_categoria: this.tarea.id_categoria,
        prioridad: this.normalizarPrioridad(this.tarea.prioridad),
        fecha_creacion: new Date(),
        fecha_vencimiento: new Date(this.tarea.fecha_vencimiento)
      });
      this.editForm.get('fecha_creacion')?.disable({ emitEvent: false });
    }
  }

  private normalizarPrioridad(prioridad: string | null | undefined): 'Alta' | 'Media' | 'Baja' {
    const value = String(prioridad ?? '').trim().toLowerCase();
    if (value === 'alta') {
      return 'Alta';
    }
    if (value === 'media') {
      return 'Media';
    }
    return 'Baja';
  }

  cerrar(): void {
    this.closed.emit();
  }

  guardarEdicion(): void {
    if (this.editForm.invalid || !this.tarea) {
      this.editForm.markAllAsTouched();
      return;
    }

    const values = this.editForm.getRawValue();
    const updatedTask = new Tarea(
      this.tarea.id,
      values.titulo,
      values.descripcion,
      new Date(),
      new Date(values.fecha_vencimiento),
      this.tarea.estado,
      this.tarea.id_usuario,
      Number(values.id_categoria),
      this.normalizarPrioridad(values.prioridad)
    );

    this.saved.emit(updatedTask);
    this.closed.emit();
  }

  validarFechas(control: AbstractControl) {
    const fechaCreacion = control.get('fecha_creacion')?.value;
    const fechaVencimiento = control.get('fecha_vencimiento')?.value;

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
}
