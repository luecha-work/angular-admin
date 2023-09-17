import { Role } from './../../../interfaces/role';
import { UserService } from './../../../service/user.service';
import { RoleService } from './../../../service/role.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  form: FormGroup;
  roles: Role[];
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      role_id: '',
    });

    this.roleService.all().subscribe((roles) => (this.roles = roles));

    this.id = this.route.snapshot.params['id'];
    this.userService.findById(this.id).subscribe((user) => {
      this.form.patchValue({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role_id: user.role.id,
      });
    });
  }

  submit(): void {
    // console.log(this.form.getRawValue());
    this.userService
      .update(this.id, this.form.getRawValue())
      .subscribe(() => this.router.navigate(['/users']));
  }
}
