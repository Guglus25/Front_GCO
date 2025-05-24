import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../Services/Product.service';
import { Product } from '../interfaces/Product.interface';

@Component({
  selector: 'ProductPage',
  imports: [],
  templateUrl: './product-page.component.html',
})
export default class ProductPageComponent {
  public productService = inject(ProductService);
  dataProduct = signal<Product | null>(null);

  findproduc() {
    this.productService.findProduct(0).subscribe((resp) => {
      this.dataProduct.set(resp);
    });
  }

  addProduct() {
    this.productService.addProduct();
  }
}
