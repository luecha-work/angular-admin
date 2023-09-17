import { UserService } from './../../../service/user.service';
import { Role } from './../../../interfaces/role';
import { RoleService } from './../../../service/role.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  regiterForm: FormGroup;
  roles: Role[];

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.regiterForm = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      role_id: '',
    });

    this.roleService.all().subscribe((roles) => (this.roles = roles));
  }

  submit(): void {
    console.log(this.regiterForm.getRawValue());
    this.userService
      .create(this.regiterForm.getRawValue())
      .subscribe(() => this.router.navigate(['/users']));
  }
}
