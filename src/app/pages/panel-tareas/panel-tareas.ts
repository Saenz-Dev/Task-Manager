import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
import { LoginService } from '../../services/login.service';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../models/categoria';

@Component({
  selector: 'app-panel-tareas',
  imports: [CommonModule, NzBreadCrumbModule, NzIconModule, NzMenuModule, NzLayoutModule, NzInputModule, NzButtonModule, NzFloatButtonModule, NzColDirective, NzTypographyModule, NzGridModule, Statistics, Filtros, Tareas, AddTask],
  templateUrl: './panel-tareas.html',
  styleUrl: './panel-tareas.css'
})
export class PanelTareas {
  private readonly loginService = inject(LoginService);
  private readonly categoriasService = inject(CategoriasService);
  private readonly router = inject(Router);

  isCollapsed = false;
  protected readonly date = new Date();
  userName = 'Usuario';
  userEmail = 'Sin correo';
  categorias: Categoria[] = [];

  constructor() {
    const identity = this.loginService.getIdentity();
    this.userName = identity?.nombre || 'Usuario';
    this.userEmail = identity?.correo || 'Sin correo';
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriasService.getCategorias().subscribe({
      next: (response: any) => {
        // Si la respuesta ya es un arreglo, lo usamos directamente
        if (Array.isArray(response)) {
          console.log('Categorías cargadas:', response);
          this.categorias = response;
        } else if (response && response.data) {
          this.categorias = response.data;
        }
        // Si no hay nada válido
        else {
          this.categorias = [];
        }
      },
      error: () => {
        this.categorias = [];
      }
    });
  }
  get userInitials(): string {
    return this.userName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part: string) => part.charAt(0).toUpperCase())
      .join('') || 'U';
  }

  cerrarSesion(): void {
    this.loginService.cerrarSesion();
    this.router.navigate(['/sign-in']);
  }
}