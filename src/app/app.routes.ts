import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/RegisterComponent';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SignIn } from './pages/sign-in/sign-in';
import { PanelTareas } from './pages/panel-tareas/panel-tareas';

export const routes: Routes = [
    { path: 'sign-up', component: RegisterComponent },
    { path: 'sign-in', component: SignIn },
    { path: 'home-tasks', component: PanelTareas },
    { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
    { path: '**', redirectTo: 'sign-in' }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<NgModule> = RouterModule.forRoot(routes);
