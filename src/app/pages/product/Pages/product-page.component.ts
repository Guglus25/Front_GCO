import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../Services/Product.service';


@Component({
  selector:"ProductPage",
  imports: [],
  templateUrl: './product-page.component.html',

})
export default class ProductPageComponent {
  
  public  productService =inject(ProductService);
  
  
  id = signal(0);
  nombre = signal('');
  descripcion = signal('');
  precio = signal(0);
  stock = signal('');
  categoria = signal('');
  codigo = signal('');
  fechaCreación = signal(Date.now);


  
}
