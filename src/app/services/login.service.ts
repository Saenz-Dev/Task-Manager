import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { GLOBAL } from './global';

export interface LoginCredentials {
    correo: string;
    contrasena: string;
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    public url: string;

    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }

    login(usuario : LoginCredentials, getToken = false): Observable<any> {
        let body = { ...usuario };
        // console.log('LoginService - login - body:', body);
        const payload = getToken ? { ...usuario, gettoken: true } : usuario;
        const params = JSON.stringify(payload);
        const headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

        return this.http.post(`${this.url}login`, params, headers).pipe(
            map(response => response)
        );
    }

    getIdentity(): any {
        const identity = localStorage.getItem('identity');
        if (!identity) {
            return null;
        }

        try {
            return JSON.parse(identity);
        } catch {
            localStorage.removeItem('identity');
            return null;
        }
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    setIdentity(identity: any): void {
        if (!identity) {
            localStorage.removeItem('identity');
            return;
        }
        localStorage.setItem('identity', JSON.stringify(identity));
    }

    setToken(token: string | null | undefined): void {
        if (!token) {
            localStorage.removeItem('token');
            return;
        }
        localStorage.setItem('token', token);
    }

    cerrarSesion(): void {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
    }
}
