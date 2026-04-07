import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Usuario } from '../models/usuario';
import { GLOBAL } from './global';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {
    public url: string;

    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }

    postUsuarios(usuario: Usuario): Observable<any> {
        const params = JSON.stringify(usuario);
        const headers = { 'headers': { 'Content-Type': 'application/json' } };
        return this.http.post(`${this.url}usuarios_tareas`, params, headers).pipe(
            map(response => response)
        );
    }

    getUsuarios(): Observable<any> {
        return this.http.get(`${this.url}usuarios_tareas`).pipe(
            map(response => response)
        );
    }

    iniciarSesion(usuario: { correo: string; contrasena: string }, getToken = false): Observable<any> {
        const payload = getToken ? { ...usuario, gettoken: true } : usuario;
        const params = JSON.stringify(payload);
        const headers = { 'headers': { 'Content-Type': 'application/json' } };

        return this.http.post(`${this.url}login`, params, headers).pipe(
            map(response => response)
        );
    }

    getIdentity(): any {
        const identity = localStorage.getItem('identity');
        return identity ? JSON.parse(identity) : null;
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    cerrarSesion(): void {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
    }
}
