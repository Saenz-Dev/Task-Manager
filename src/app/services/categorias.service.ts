import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Categoria } from '../models/categoria';
import { GLOBAL } from './global';

@Injectable({
    providedIn: 'root'
})
export class CategoriasService {
    public url: string;
    private readonly resource = 'categorias';

    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }

    getCategorias(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        return this.http.get(`${this.url}${this.resource}`, { headers });
    }

    getCategoriaById(idCategoria: number): Observable<any> {
        return this.http.get(`${this.url}${this.resource}/${idCategoria}`).pipe(
            map(response => response)
        );
    }

    postCategoria(categoria: Categoria): Observable<any> {
        const params = JSON.stringify(categoria);
        const headers = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http.post(`${this.url}${this.resource}`, params, headers).pipe(
            map(response => response)
        );
    }

    putCategoria(idCategoria: number, categoria: Partial<Categoria>): Observable<any> {
        const params = JSON.stringify(categoria);
        const headers = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http.put(`${this.url}${this.resource}/${idCategoria}`, params, headers).pipe(
            map(response => response)
        );
    }

    deleteCategoria(idCategoria: number): Observable<any> {
        return this.http.delete(`${this.url}${this.resource}/${idCategoria}`).pipe(
            map(response => response)
        );
    }
}