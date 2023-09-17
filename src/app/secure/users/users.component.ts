import { User } from './../../interfaces/user';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  meta: any;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.load();
  }

  load(page: number = 1): void {
    this.userService.all(page).subscribe((res: any) => {
      this.users = res.data;
      this.meta = res.meta;
      console.log(this.meta);
    });
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.userService.delete(id).subscribe(() => {
        this.users = this.users.filter((u) => u.id !== id);
      });
    }
  }
}
