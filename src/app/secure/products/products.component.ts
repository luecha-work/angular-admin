import { ProductService } from './../../service/product.service';
import { Products } from './../../interfaces/products';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  page: number = 1;
  products: Products[] = [];
  @Input() meta: any;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.all().subscribe((res) => {
      this.products = res.data;
      this.meta = res.meta;
    });
  }
  load(page: number = 1): void {
    this.productService.all(page).subscribe((res: any) => {
      this.products = res.data;
      this.meta = res.meta;
    });
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.productService.delete(id).subscribe(() => {
        this.products = this.products.filter((p) => p.id !== id);
      });
    }
  }
}
