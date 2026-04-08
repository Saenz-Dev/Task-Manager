import { Component } from '@angular/core';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { Tarea } from '../../models/tarea';

@Component({
  selector: 'statistics',
  imports: [NzCardModule, NzIconModule, NzGridModule, NzStatisticModule],
  templateUrl: './statistics.html',
  styleUrls: ['./statistics.css']
})
export class Statistics {
  public totalTasks: number;
  public pendientesTasks: number;
  public completadasTasks: number;
  public vencidasTasks: number;

  constructor() {
    this.totalTasks = 0;
    this.pendientesTasks = 0;
    this.completadasTasks = 0;
    this.vencidasTasks = 0;
  }

  countTotalTask(tareas: Tarea[]) {
    return tareas.length;
  }
}
