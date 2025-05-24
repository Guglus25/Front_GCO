import { Component, inject } from '@angular/core';
import { ProductService } from '../Services/Product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list-page',
  imports: [CommonModule, RouterLink, SweetAlert2Module],
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

  deleteProduct(id: number) {
    Swal.fire({
      title: 'Confirmación',
      text: '¿Deseas eliminar el procuto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe({
          next: (res) => {
            Swal.fire(
              '¡Eliminado!',
              'El producto fue eliminado correctamente.',
              'success'
            );
            this.listProduct();
          },
          error: (err) => console.error('Error al ELIMINAR producto:', err),
        });
      }
    });
  }
}
