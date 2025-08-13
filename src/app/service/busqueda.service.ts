import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resolucion } from '../model/resolucion.model';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  private url = 'assets/data.json'; // Tu archivo JSON con los datos

  constructor(private http: HttpClient) {}

  buscarTodos(): Observable<resolucion[]> {
    return this.http.get<resolucion[]>(this.url);
  }
}
