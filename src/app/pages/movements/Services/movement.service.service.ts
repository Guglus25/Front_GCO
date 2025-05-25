import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Movements } from '../interfaces/movements.interface';

@Injectable({
  providedIn: 'root',
})
export class MovementServiceService {
  private http = inject(HttpClient);
  listpro = signal<Movements[]>([]);

  constructor() {}

  listMovement() {
    return this.http
      .get<Movements[]>(`${environment.ApiGCO}/movement`)
      .subscribe((resp) => {
        this.listpro.set(resp);
      });
  }

  findProduct(id: number) {
    return this.http.get<Movements>(`${environment.ApiGCO}/movement/${id}`);
  }

  addProduct(datamovem: Movements) {
    return this.http.post<Movements>(
      `${environment.ApiGCO}/movement`,
      datamovem
    );
  }

  updateProduct(id: number, datamovem: Movements) {
    return this.http.put<Movements>(
      `${environment.ApiGCO}/movement/${id}`,
      datamovem
    );
  }

  deleteProduct(id: number) {
    return this.http.delete(`${environment.ApiGCO}/movement/${id}`, {
      responseType: 'text',
    });
  }
}
