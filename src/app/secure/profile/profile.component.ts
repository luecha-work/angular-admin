import { Auth } from './../../../classes/auth';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  infoForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.infoForm = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
    });

    this.passwordForm = this.formBuilder.group({
      password: '',
      password_confirm: '',
    });

    Auth.userEmiter.subscribe((user) => {
      this.infoForm.patchValue(user);
    });

    console.log('infoForm: ', this.infoForm.getRawValue());
  }

  infoSubmit(): void {
    this.authService
      .updateInfo(this.infoForm.getRawValue())
      .subscribe((user) => Auth.userEmiter.emit(user));
  }

  passSubmit(): void {
    this.authService
      .updatePassword(this.passwordForm.getRawValue())
      .subscribe((res) => console.log(res));
  }
}
