import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { Tarea } from '../../models/tarea';

@Component({
  selector: 'app-delete-task-confirm',
  standalone: true,
  imports: [NzModalModule, NzButtonModule, NzIconModule],
  templateUrl: './delete-task-confirm.html',
  styleUrl: './delete-task-confirm.css'
})
export class DeleteTaskConfirm {
  @Input() visible = false;
  @Input() tarea: Tarea | null = null;

  @Output() canceled = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<number>();

  cancelar(): void {
    this.canceled.emit();
  }

  confirmar(): void {
    if (!this.tarea) {
      return;
    }
    const taskId = this.tarea.id ?? (this.tarea as any).id_tarea;
    if (!taskId) {
      return;
    }
    this.confirmed.emit(taskId);
  }
}
