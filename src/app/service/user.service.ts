import { environment } from './../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends RestService {
  endPoint: string = `${environment.api}/users`;
  // constructor(private http: HttpClient) {}

  // all(page: number): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.endPoint}?page=${page}`);
  // }

  // create(data: any): Observable<User> {
  //   return this.http.post<User>(this.endPoint, data);
  // }

  // findById(id: number): Observable<User> {
  //   return this.http.get<User>(`${this.endPoint}/${id}`);
  // }

  // update(id: number, data: any): Observable<User> {
  //   return this.http.put<User>(`${this.endPoint}/${id}`, data);
  // }

  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.endPoint}/${id}`);
  // }
}
