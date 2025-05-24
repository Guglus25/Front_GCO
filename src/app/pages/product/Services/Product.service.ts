import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Product } from '../interfaces/Product.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  listpro = signal<Product[]>([]);

  constructor() {
    
  }
  listProduct() {
    this.http
      .get<Product[]>(`${environment.ApiGCO}/product`)
      .subscribe((resp) => {
        this.listpro.set(resp);
      });
  }
  
  findProduct(id:number) {
    return this.http
      .get<Product>(`${environment.ApiGCO}/product/${id}`);
  }

  addProduct() {
    // this.http.post(`${environment.ApiGCO}/product`);
  }
}
