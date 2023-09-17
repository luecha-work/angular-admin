import { AuthService } from './../../service/auth.service';
import { environment } from './../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {}

  submit(): void {
    this.authService
      .login(this.form.getRawValue())
      .subscribe((res) => this.router.navigate(['/']));
  }
}
