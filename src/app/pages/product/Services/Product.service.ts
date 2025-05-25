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
      return this.http
        .get<Product[]>(`${environment.ApiGCO}/product`)
        .subscribe((resp) => {
          this.listpro.set(resp);
        });
    }
  
  findProduct(id:number) {
    return this.http
      .get<Product>(`${environment.ApiGCO}/product/${id}`);
  }

  addProduct(dataprodu:Product) {    
    return this.http.post<Product>(`${environment.ApiGCO}/product`,dataprodu);
  }

  updateProduct(id: number,dataProduct:Product) {
    return this.http.put<Product>(`${environment.ApiGCO}/product/${id}`,dataProduct);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${environment.ApiGCO}/product/${id}`,{ responseType: 'text' });
  }  
}
