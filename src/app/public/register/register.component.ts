import { AuthService } from './../../service/auth.service';
import { environment } from './../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  password_confirm: string = '';

  ngOnInit(): void {}

  submit(): void {
    const body = {
      first_name: this.firstname,
      last_name: this.lastname,
      email: this.email,
      password: this.password,
      password_confirm: this.password_confirm,
    };

    const result = this.authService.register(body).subscribe((res) => {
      this.router.navigate(['/login']);
    });
  }
}
