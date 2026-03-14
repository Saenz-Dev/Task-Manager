import { Component } from '@angular/core';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-panel-tareas',
  imports: [NzBreadCrumbModule, NzIconModule, NzMenuModule, NzLayoutModule],
  templateUrl: './panel-tareas.html',
  styles: `
    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;
    }                                 

    .trigger:hover {
      color: #1890ff;
    }

    .logo {
      height: 32px;
      background: rgba(255, 255, 255, 0.2);
      margin: 16px;
    }

    nz-header {
      background: #fff;
      padding: 0;
    }

    nz-content {
      margin: 0 16px;
    }

    nz-breadcrumb {
      margin: 16px 0;
    }

    .inner-content {
      padding: 24px;
      background: #fff;
      min-height: 360px;
    }

    nz-footer {
      text-align: center;
    }
  `
})
export class PanelTareas {
  isCollapsed = false;
  protected readonly date = new Date();
}