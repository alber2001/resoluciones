import { bancos } from './../model/banco.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class BancosService {
  private apiUrl = 'assets/bancos.json';

  constructor(private http: HttpClient) {}

  
  getBancos(): Observable<bancos[]> {
  return this.http.get<bancos[]>(this.apiUrl);
}
  
}
