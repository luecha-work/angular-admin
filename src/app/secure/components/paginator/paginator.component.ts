import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit {
  page: number = 1;
  @Input('meta') meta: any;
  @Output() pageChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  next(): void {
    if (this.page === this.meta.last_page) {
      return;
    }
    this.page++;
    this.pageChange.emit(this.page);
  }

  Previous(): void {
    if (this.page === 1) {
      return;
    }
    this.page--;
    this.pageChange.emit(this.page);
  }
}
