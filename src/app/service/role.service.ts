import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.development';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends RestService {
  endPoint: string = `${environment.api}/roles`;
  // constructor(private http: HttpClient) {}

  // getRole(): Observable<any> {
  //   return this.http.get<any>(this.endPoint);
  // }
}
