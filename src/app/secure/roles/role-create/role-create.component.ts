import { RoleService } from './../../../service/role.service';
import { PermissionService } from './../../../service/permission.service';
import { Permission } from './../../../interfaces/permission';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css'],
})
export class RoleCreateComponent implements OnInit {
  roleForm: FormGroup;
  permissions: Permission[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private permissionService: PermissionService,
    private roleService: RoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roleForm = this.formBuilder.group({
      name: '',
      permissions: this.formBuilder.array([]),
    });

    this.permissionService.all().subscribe((permisstions) => {
      this.permissions = permisstions;

      this.permissions.forEach((p) => {
        this.permissionArray.push(
          this.formBuilder.group({
            value: false,
            id: p.id,
          })
        );
      });
    });
  }

  get permissionArray(): FormArray {
    return this.roleForm.get('permissions') as FormArray;
  }

  submit(): void {
    const formData = this.roleForm.getRawValue();

    const data = {
      name: formData.name,
      permissions: formData.permissions
        .filter((p: { value: boolean }) => p.value === true)
        .map((p: { id: any }) => p.id),
    };

    this.roleService
      .create(data)
      .subscribe(() => this.router.navigate(['/roles']));
  }
}
