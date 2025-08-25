import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Planilla } from '../model/ayuda.model';

@Injectable({
  providedIn: 'root',
})
export class PlanillaService {
  private apiUrl = 'assets/ayuda.json';

  constructor(private http: HttpClient) {}

  getPlanilla(): Observable<Planilla> {
    return this.http.get<Planilla>(this.apiUrl);
  }
}
