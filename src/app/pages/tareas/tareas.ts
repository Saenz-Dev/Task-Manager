import { Component } from '@angular/core';
import { Tarea } from '../../models/tarea';
import { FormsModule } from '@angular/forms';

import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from "ng-zorro-antd/form";
import { Categoria } from '../../models/categoria';

@Component({
  selector: 'tareas',
  imports: [NzCollapseModule, NzIconModule, FormsModule, NzCheckboxModule, NzFormModule],
  templateUrl: './tareas.html',
})
export class Tareas {
  public tareas: Tarea[];
  public categorias: Categoria[];


  constructor() {
    this.tareas = [
      new Tarea(1, 'Estudiar para calculo', 'Debo estudiar para calculo', new Date(), new Date('2026-03-20'), 'pendiente', 1, 1),
      new Tarea(2, 'Hacer Aseo', 'Realizar aseo casa', new Date(), new Date('2026-04-20'), 'hecha', 4, 3),
      new Tarea(3, 'Comer', 'Debo comer bien', new Date(), new Date('2026-03-19'), 'pendiente', 3, 2),
    ];
    this.categorias = [
      new Categoria(1, 'Trabajo', 'blue', 'rgba(24, 143, 255, 0.35)'),
      new Categoria(2, 'Personal', 'orange', 'rgba(255, 136, 24, 0.35)'),
      new Categoria(3, 'Salud', 'green', 'rgba(51, 255, 24, 0.35)'),
      new Categoria(4, 'Estudio', 'purple', ' rgba(209, 24, 255, 0.35)'),
      new Categoria(5, 'Otros', 'red', 'rgba(255, 24, 24, 0.35)'),
    ]
  }

  findCategoria(id: number): Categoria | null {
    for (let categoria of this.categorias) {
      if (categoria.id_categoria == id) {
        return categoria;
      }
    }
    return null;
  }
}
