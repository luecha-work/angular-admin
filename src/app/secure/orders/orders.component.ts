import { OrderService } from './../../service/order.service';
import { Order } from './../../interfaces/order';
import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [
    trigger('tableState', [
      state('show', style({ maxHeight: '150px' })),
      state('hide', style({ maxHeight: 0 })),
      transition('show => hide', animate('1000ms ease-in')),
      transition('hide => show', animate('1000ms ease-out')),
    ]),
  ],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  meta: any;
  selected: number;

  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.load();
  }

  load(page: number = 1): void {
    this.orderService.all().subscribe((res) => {
      this.orders = res.data;
      this.meta = res.meta;
      console.log('orders: ', this.orders);
    });
  }

  select(id: number): void {
    this.selected = this.selected === id ? 0 : id;
  }

  itemState(id: number): string {
    return this.selected === id ? 'show' : 'hide';
  }

  export(): void {
    this.orderService.export().subscribe((res) => {
      new Blob([res], { type: 'text/csv' });
      const downloadUrl = window.URL.createObjectURL(res);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'orders.csv';
      link.click();
    });
  }
}
