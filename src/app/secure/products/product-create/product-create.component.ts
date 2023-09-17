import { ProductService } from './../../../service/product.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      title: '',
      description: '',
      image: '',
      price: '',
    });
  }

  submit(): void {
    this.productService
      .create(this.productForm.getRawValue())
      .subscribe(() => this.router.navigate(['/products']));

    console.log(this.productForm.getRawValue());
  }
}
