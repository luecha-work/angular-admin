import { Role } from './../../../interfaces/role';
import { Permission } from './../../../interfaces/permission';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from './../../../service/role.service';
import { PermissionService } from './../../../service/permission.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css'],
})
export class RoleEditComponent implements OnInit {
  roleForm: FormGroup;
  permissions: Permission[] = [];
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private permissionService: PermissionService,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute
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

    this.id = this.route.snapshot.params['id'];

    this.roleService.findById(this.id).subscribe((role: Role) => {
      const values = this.permissions.map((p) => {
        return {
          value: role.permissions?.some((r) => r.id === p.id),
          id: p.id,
        };
      });

      this.roleForm.patchValue({
        name: role.name,
        permissions: values,
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
      .update(this.id, data)
      .subscribe(() => this.router.navigate(['/roles']));
  }
}
