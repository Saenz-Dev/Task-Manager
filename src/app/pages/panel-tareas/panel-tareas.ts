import { Component } from '@angular/core';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzColDirective } from "ng-zorro-antd/grid";
import { NzTypographyModule } from 'ng-zorro-antd/typography'; 
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Statistics } from "../statistics/statistics";
import { Filtros } from '../filtros/filtros';
import { Tareas } from '../tareas/tareas';
import { AddTask } from '../../components/add-task/add-task';

@Component({
  selector: 'app-panel-tareas',
  imports: [NzBreadCrumbModule, NzIconModule, NzMenuModule, NzLayoutModule, NzInputModule, NzButtonModule, NzFloatButtonModule, NzColDirective, NzTypographyModule, NzGridModule, Statistics, Filtros, Tareas, AddTask],
  templateUrl: './panel-tareas.html',
})
export class PanelTareas {
  isCollapsed = false;
  protected readonly date = new Date();
}