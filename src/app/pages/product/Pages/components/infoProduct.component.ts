import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { Product } from '../../interfaces/Product.interface';
import { ProductService } from '../../Services/Product.service';

@Component({
  selector: 'info-product',  
  templateUrl: './infoProduct.component.html'  
})
export class InfoProductComponent implements OnInit{ 
productInterf=signal<Product|null>(null);
  productService=inject(ProductService);
id=input.required<number>();

constructor() {  
  
}
ngOnInit(): void {
  console.log(this.id());
  if (this.id() != 0) {
      this.productService.findProduct(this.id()).subscribe((resp) => {
         this.productInterf.set(resp);
      });
    }    
}


}
