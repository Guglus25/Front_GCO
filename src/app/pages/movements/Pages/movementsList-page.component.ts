import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import Swal from 'sweetalert2';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProductService } from '../../product/Services/Product.service';
import { Product } from '../../product/interfaces/Product.interface';
import { InfoProductComponent } from "../../product/Pages/components/infoProduct.component";
import { MovementService } from '../Services/movement.service';

@Component({
  selector: 'app-movements-list-page',
  imports: [CommonModule, RouterLink, SweetAlert2Module, 
    InfoProductComponent,],
  templateUrl: './movementsList-page.component.html',  
})
export default class MovementsListPageComponent { 
movementService = inject(MovementService);
productService = inject(ProductService);
idproducto = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['idproducto']))
  );

  productInterf=signal<Product|null>(null);
constructor() {
  this.listMovements(this.idproducto());
  
  }

  listMovements(idProducto:number) {
   this.movementService.listMovement(idProducto);
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
        this.movementService.deleteMovement(id).subscribe({
          next: (res) => {
            Swal.fire(
              '¡Eliminado!',
              'El producto fue eliminado correctamente.',
              'success'
            );
            this.listMovements(id);
          },
          error: (err) => console.error('Error al ELIMINAR producto:', err),
        });
      }
    });
  }
}
