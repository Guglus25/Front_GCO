import { Component, inject } from '@angular/core';
import { ProductService } from '../Services/Product.service';

@Component({
  selector: 'app-product-list-page',
  imports: [],
  templateUrl: './productList-page.component.html',
})
export default class ProductListPageComponent {
  productService = inject(ProductService);

  constructor() {
    this.listProduct();
  }
  listProduct() {
    this.productService.listProduct();
  }
}
