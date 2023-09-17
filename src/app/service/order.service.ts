import { environment } from './../../environments/environment.development';
import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends RestService {
  endPoint: string = `${environment.api}/orders`;

  export(): Observable<any> {
    return this.http.post(
      `${environment.api}/export`,
      {},
      { responseType: 'blob' }
    );
  }
}
