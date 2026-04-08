import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, map, Observable } from 'rxjs';

import { Tarea } from '../models/tarea';
import { GLOBAL } from './global';

@Injectable({
	providedIn: 'root'
})
export class TareasService {
	public url: string;
	private readonly resource = 'tareas';
	private readonly refreshTareasSubject = new Subject<void>();
	refreshTareas$ = this.refreshTareasSubject.asObservable();

	constructor(private http: HttpClient) {
		this.url = GLOBAL.url;
	}

    headers() {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
    }

	getTareas(): Observable<any> {
        let headers = this.headers();
		return this.http.get(`${this.url}${this.resource}`, { headers }).pipe(
			map(response => response)
		);
	}

	getTareaById(idTarea: number): Observable<any> {
		const headers = this.headers();
		const params = new HttpParams().set('id', idTarea.toString());

		return this.http.get(`${this.url}tareas_usuario`, { headers, params }).pipe(
			map(response => response)
		);
	}

	postTarea(tarea: Tarea): Observable<any> {
		const params = JSON.stringify(tarea);
		const headers = { headers: this.headers() };

		return this.http.post(`${this.url}${this.resource}`, params, headers).pipe(
			map(response => response)
		);
	}

	putTarea(idTarea: number, tarea: Partial<Tarea>): Observable<any> {
		const params = JSON.stringify(tarea);
        
		const headers = { headers: this.headers() };

		return this.http.put(`${this.url}${this.resource}/${idTarea}`, params, headers).pipe(
			map(response => response)
		);
	}

	deleteTarea(idTarea: number): Observable<any> {
        //crear body con idTarea
        const body = { id: idTarea };
		return this.http.delete(`${this.url}${this.resource}`, { headers: this.headers(), body }).pipe(
			map(response => response)
		);
	}

	notificarRecargaTareas(): void {
		this.refreshTareasSubject.next();
	}
}
