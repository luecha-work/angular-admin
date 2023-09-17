import { environment } from './../../environments/environment.development';
import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionService extends RestService {
  endPoint: string = `${environment.api}/permissions`;
}
