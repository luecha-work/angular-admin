import { Auth } from './../../../classes/auth';
import { User } from './../../interfaces/user';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  user: User | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    Auth.userEmiter.subscribe((user) => (this.user = user));
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      console.log('sussess');
    });
  }
}
