import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Tarea } from '../../models/tarea';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from "ng-zorro-antd/form";
import { Categoria } from '../../models/categoria';
import { NotificationService } from '../../services/notification.service';
import { EditTask } from '../../components/edit-task/edit-task';
import { DeleteTaskConfirm } from '../../components/delete-task-confirm/delete-task-confirm';
import { TareasService } from '../../services/tareas.service';
import { CategoriasService } from '../../services/categorias.service';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tareas',
  imports: [NzButtonModule, NzIconModule, FormsModule, NzCheckboxModule, NzFormModule, EditTask, DeleteTaskConfirm],
  templateUrl: './tareas.html',
  styles: [`
    :host {
      display: block;
    }

    .tasks-shell {
      padding: 6px;
    }

    .tasks-head {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }

    .tasks-kicker {
      margin: 0;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.4px;
      color: #6f8f59;
    }

    .tasks-title {
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 22px;
      font-weight: 700;
      color: #3b4435;
    }

    .tasks-count {
      margin-left: auto;
      font-size: 12px;
      font-weight: 700;
      color: #55624d;
      padding: 4px 10px;
      border-radius: 999px;
      background: #edf4e6;
      border: 1px solid #c8d7bb;
    }

    .tasks-list {
      display: grid;
      gap: 10px;
    }

    .tasks-empty-state {
      min-height: 220px;
      border-radius: 14px;
      border: 1px dashed rgba(163, 185, 145, 0.8);
      background: linear-gradient(135deg, rgba(250, 253, 246, 0.95), rgba(241, 248, 234, 0.9));
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 22px 18px;
    }

    .tasks-empty-icon {
      font-size: 34px;
      line-height: 1;
      color: #7aa05e;
      margin-bottom: 10px;
    }

    .tasks-empty-title {
      margin: 0;
      font-size: 18px;
      font-weight: 700;
      color: #3f4d35;
    }

    .tasks-empty-text {
      margin: 8px 0 0;
      font-size: 13px;
      color: #65735a;
      max-width: 340px;
      line-height: 1.45;
    }

    .task-panel {
      border-radius: 14px !important;
      border: 1px solid rgba(190, 210, 173, 0.65);
      background: linear-gradient(135deg, #ffffff, #f7fbf3);
      box-shadow: 0 8px 20px rgba(66, 91, 52, 0.09);
      padding: 12px 14px;
    }

    .task-panel.task-completed {
      background: linear-gradient(135deg, #edf3e6, #e6efdd);
      border-color: rgba(160, 184, 142, 0.85);
    }

    .task-panel.task-completed .titulo-tarea,
    .task-panel.task-completed .task-description {
      text-decoration: line-through;
      text-decoration-thickness: 1.5px;
      text-underline-offset: 2px;
    }

    .task-panel:hover {
      transform: translateY(-1px);
    }

    .task-header {
      display: flex;
      flex-direction: column;
      gap: 10px;
      position: relative;
      padding-right: 92px;
    }

    .task-description {
      margin: 0 0 0 31px;
      color: #5d5d5d;
      font-size: 14px;
      line-height: 1.45;
    }

    .task-title-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .task-check {
      transform: translateY(-1px);
    }

    .titulo-tarea {
      font-size: 15px;
      font-weight: 700;
      color: #30362c;
    }

    .task-meta-wrap {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 8px;
      flex-wrap: wrap;
      margin-left: 31px;
    }

    .task-actions {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      position: absolute;
      top: 0;
      right: 0;
    }

    .btn-task-action {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      padding: 0;
      font-size: 15px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #d9e2cf;
      background: #f8fbf4;
      color: #425238;
      transition: transform 0.22s ease, box-shadow 0.22s ease, background-color 0.22s ease, border-color 0.22s ease, color 0.22s ease;
    }

    .btn-edit:hover {
      border-color: #45d287;
      background: #d8ffe9;
      color: #178a4f;
      box-shadow: 0 10px 18px rgba(36, 201, 116, 0.28);
      transform: translateY(-2px) scale(1.06);
    }

    .btn-delete {
      border-color: #e8cfcf;
      background: #fff4f4;
      color: #a24646;
    }

    .btn-delete:hover {
      border-color: #ff7d6e;
      background: #ffe0dc;
      color: #c83d2f;
      box-shadow: 0 10px 18px rgba(255, 105, 87, 0.3);
      transform: translateY(-2px) scale(1.06);
    }

    .prioridad-tarea {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      border: 1px solid transparent;
    }

    .prioridad-alta {
      background: linear-gradient(135deg, #ff4d4d, #ff7a59);
      color: #ffffff;
      border-color: #ff3d3d;
      box-shadow: 0 8px 16px rgba(255, 61, 61, 0.28);
    }

    .prioridad-media {
      background: linear-gradient(135deg, #ffb347, #ffcc33);
      color: #5a4100;
      border-color: #ffb347;
      box-shadow: 0 8px 16px rgba(255, 179, 71, 0.24);
    }

    .prioridad-baja {
      background: linear-gradient(135deg, #39d98a, #6ee7b7);
      color: #0f4d2e;
      border-color: #39d98a;
      box-shadow: 0 8px 16px rgba(57, 217, 138, 0.2);
    }

    .id_categoria-tarea {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      border: 1px solid #b9d5a8;
      background: linear-gradient(135deg, #f3fbec, #e5f3d8);
      color: #446037;
      box-shadow: 0 6px 12px rgba(139, 175, 112, 0.14);
    }

    .fechaVencimiento-tarea {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 12px;
      font-weight: 600;
      color: #6c6f66;
      padding: 0;
      border-radius: 0;
      background: transparent;
    }

    .fecha-vencida {
      color: #c62828;
      font-weight: 800;
      background: transparent;
    }

    @media (max-width: 768px) {
      .tasks-title {
        font-size: 20px;
      }

      .tasks-count {
        margin-left: 0;
      }

      .task-meta-wrap {
        justify-content: flex-start;
        margin-left: 30px;
      }

      .task-actions {
        top: 2px;
        right: 2px;
      }

      .btn-task-action {
        width: 32px;
        height: 32px;
      }

      .task-description {
        margin-left: 30px;
      }
    }
  `]
})
export class Tareas implements OnInit, OnDestroy {
  public tareas: Tarea[];
  public categorias: Categoria[];
  public selectedTask: Tarea | null = null;
  public taskToDelete: Tarea | null = null;
  public isEditOpen = false;
  public isDeleteConfirmOpen = false;
  public completedTaskIds = new Set<number>();
  private refreshSubscription?: Subscription;
  private readonly notificationService = inject(NotificationService);
  private readonly tareasService = inject(TareasService);
  private readonly categoriasService = inject(CategoriasService);


  constructor(
    public _cdr: ChangeDetectorRef
  ) {
    this.tareas = [];
    this.categorias = [];
  }

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarTareas();
    this.refreshSubscription = this.tareasService.refreshTareas$.subscribe(() => {
      this.cargarTareas();
    });
  }

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe();
  }

  cargarTareas(): void {
    const id = localStorage.getItem('identity');
    let body = JSON.parse(id ?? '{}');
    console.log(body);
    this.tareasService.getTareaById(body.id_usuario).subscribe(
      (response: any) => {
        const tareasResponse = Array.isArray(response?.data) ? response.data : [];
        this.tareas = [];

        for (let tarea of tareasResponse) {
          // mapear atributo por atributo
          tarea.id = tarea.id_tarea;
          tarea.titulo = tarea.titulo;
          tarea.descripcion = tarea.descripcion;
          tarea.fecha_creacion = new Date(tarea.fecha_creacion);
          tarea.fecha_vencimiento = new Date(tarea.fecha_vencimiento);
          tarea.estado = tarea.estado;
          tarea.id_categoria = tarea.id_categoria;
          tarea.id_usuario = tarea.id_usuario;
          tarea.prioridad = this.normalizarPrioridad(tarea.prioridad);
          this.tareas.push(tarea);
        }

        console.log('Tareas después de mapear:', this.tareas);
        this.completedTaskIds.clear();
        this.tareas.forEach((tarea) => {
          if (this.estadoEsCompletado(tarea.estado)) {
            this.completedTaskIds.add(tarea.id);
          }
        });
        this._cdr.detectChanges();
      },
      (error) => {
        this.tareas = [];
        this._cargarTareasFallback();
      }
    );
  }

  cargarCategorias(): void {
    this.categoriasService.getCategorias().subscribe(
      (response: any) => {
        const data = response.data;
        this.categorias = response.data
        this._cdr.detectChanges();
      },
      error => {
        this.categorias = [];
      }
    );
  }

  private _cargarTareasFallback(): void {
    this.tareas = [
      new Tarea(1, 'Estudiar para calculo', 'Debo estudiar para calculo', new Date(), new Date('2026-03-20'), 'pendiente', 1, 1, 'Alta'),
      new Tarea(2, 'Hacer Aseo', 'Realizar aseo casa', new Date(), new Date('2026-04-20'), 'hecha', 4, 3, 'Baja'),
      new Tarea(3, 'Comer', 'Debo comer bien', new Date(), new Date('2026-03-19'), 'pendiente', 3, 2, 'Media'),
    ];
    this.completedTaskIds.clear();
    this.tareas.forEach((tarea) => {
      if (this.estadoEsCompletado(tarea.estado)) {
        this.completedTaskIds.add(tarea.id);
      }
    });
  }

  private estadoEsCompletado(estado: string | null | undefined): boolean {
    const value = String(estado ?? '').trim().toLowerCase();
    return value === 'completada' || value === 'hecha';
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

  findCategoria(id: number): Categoria | null {
    for (let categoria of this.categorias) {
      if (categoria.id_categoria == id) {
        return categoria;
      }
    }
    return null;
  }

  formatFecha(fecha: Date): string {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }

  isVencida(fecha: Date): boolean {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaTarea = new Date(fecha);
    fechaTarea.setHours(0, 0, 0, 0);
    return fechaTarea < hoy;
  }

  getPrioridadNivel(tarea: Tarea): 'Alta' | 'Media' | 'Baja' {
    return this.normalizarPrioridad(tarea.prioridad);
  }

  getPrioridadTexto(tarea: Tarea): 'Alta' | 'Media' | 'Baja' {
    return this.getPrioridadNivel(tarea);
  }

  isCompletada(tarea: Tarea): boolean {
    return this.completedTaskIds.has(tarea.id) || this.estadoEsCompletado(tarea.estado);
  }

  cambiarEstadoTarea(tarea: Tarea, checked: boolean): void {
    const estadoAnterior = tarea.estado;
    const nuevoEstado = checked ? 'Completada' : 'Pendiente';
    
    tarea.estado = nuevoEstado;
    if (checked) {
      this.completedTaskIds.add(tarea.id);
    } else {
      this.completedTaskIds.delete(tarea.id);
    }
    console.log('Actualizando estado de tarea:', tarea);

    this.tareasService.putTarea(tarea.id, tarea).subscribe(
      (result:any) => {
        console.log(tarea)
        this.notificationService.success(`Tarea marcada como ${checked ? 'Completada' : 'Pendiente'}`);
      },
      (error:any) => {
        tarea.estado = estadoAnterior;
        if (this.estadoEsCompletado(estadoAnterior)) {
          this.completedTaskIds.add(tarea.id);
        } else {
          this.completedTaskIds.delete(tarea.id);
        }
        this.notificationService.error('No fue posible actualizar el estado de la tarea');
      }
    );
  }

  editarTarea(tarea: Tarea): void {
    this.selectedTask = tarea;
    this.isEditOpen = true;
  }

  solicitarBorrado(tarea: Tarea): void {
    this.taskToDelete = tarea;
    this.isDeleteConfirmOpen = true;
  }

  borrarTarea(idTarea: number): void {
    console.log('Eliminando tarea con id:', idTarea);
    this.tareasService.deleteTarea(idTarea).subscribe({
      next: () => {
        this.tareas = this.tareas.filter((tarea) => tarea.id !== idTarea);
        this.completedTaskIds.delete(idTarea);
        this.notificationService.success('Tarea eliminada correctamente');
        this.tareasService.notificarRecargaTareas();
        this.cerrarConfirmacionBorrado();
      },
      error: () => {
        this.notificationService.error('No fue posible eliminar la tarea');
      }
    });
  }

  cerrarPanelEdicion(): void {
    this.isEditOpen = false;
    this.selectedTask = null;
  }

  aplicarEdicion(updatedTask: Tarea): void {
    this.tareasService.putTarea(updatedTask.id, updatedTask).subscribe({
      next: () => {
        this.notificationService.success('Tarea actualizada correctamente');
        this.tareasService.notificarRecargaTareas();
        this.cerrarPanelEdicion();
      },
      error: () => {
        this.notificationService.error('No fue posible actualizar la tarea');
      }
    });
  }

  cerrarConfirmacionBorrado(): void {
    this.isDeleteConfirmOpen = false;
    this.taskToDelete = null;
  }
}
