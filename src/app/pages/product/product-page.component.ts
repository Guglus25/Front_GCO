import { Component, signal } from '@angular/core';

@Component({  
  imports: [],
  templateUrl: './product-page.component.html',
  
})
export class ProductPageComponent {

id=signal(0);
nombre=signal("");
descripcion=signal("");
precio=signal(0);
stock=signal("");
categoria=signal("");
codigo=signal("");
fechaCreación=signal(Date.now);

addProduct() {
throw new Error('Method not implemented.'); 
}
}
