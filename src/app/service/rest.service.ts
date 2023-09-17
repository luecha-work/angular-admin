import { environment } from './../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class RestService {
  //endPoint: string = `${environment.api}/users`;

  abstract get endPoint(): string;

  constructor(protected http: HttpClient) {}

  all(page?: number): Observable<any> {
    let url = this.endPoint;

    if (page) {
      url += `?page=${page}`;
    }
    return this.http.get(url);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.endPoint, data);
  }

  findById(id: number): Observable<any> {
    return this.http.get(`${this.endPoint}/${id}`);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.endPoint}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endPoint}/${id}`);
  }
}
