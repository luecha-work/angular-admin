import { Role } from './../../interfaces/role';
import { RoleService } from './../../service/role.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];
  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.roleService.all().subscribe((roles) => {
      this.roles = roles;
    });
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.roleService.delete(id).subscribe(() => {
        this.roles = this.roles.filter((r) => r.id !== id);
      });
    }
  }
}
