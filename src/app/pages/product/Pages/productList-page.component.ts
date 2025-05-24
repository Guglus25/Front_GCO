import { Component, inject } from '@angular/core';
import { ProductService } from '../Services/Product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './productList-page.component.html',
})
export default class ProductListPageComponent {
  productService = inject(ProductService);

  constructor() {
    this.listProduct();
  }
  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-CO'); // Cambia el locale si es necesario
  }
  listProduct() {
    this.productService.listProduct();
  }
}
