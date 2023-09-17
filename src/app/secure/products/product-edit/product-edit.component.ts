import { ProductService } from './../../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      title: '',
      description: '',
      image: '',
      price: '',
    });

    this.id = this.route.snapshot.params['id'];

    this.productService
      .findById(this.id)
      .subscribe((product) => this.productForm.patchValue(product));
  }

  submit(): void {
    this.productService
      .update(this.id, this.productForm.getRawValue())
      .subscribe(() => this.router.navigate(['products']));
  }
}
