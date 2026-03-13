import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { ModuleWithProviders, NgModule } from '@angular/core';

export const routes: Routes = [
    {path:'login', component: Login},
    {path:'', redirectTo: 'login', pathMatch: 'full'}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<NgModule> = RouterModule.forRoot(routes);
