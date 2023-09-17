import { User } from './../app/interfaces/user';
import { EventEmitter } from '@angular/core';

export class Auth {
  static userEmiter = new EventEmitter<User>();
}
