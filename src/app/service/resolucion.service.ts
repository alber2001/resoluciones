import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resolucion } from './../model/resolucion.model';

@Injectable({
  providedIn: 'root',
})
export class ResolucionService {
  private url = 'assets/data.json';

  constructor(private http: HttpClient) {}

  obtenerResolucion(): Observable<resolucion[]> {
    return this.http.get<resolucion[]>(this.url);
  }
  
}
