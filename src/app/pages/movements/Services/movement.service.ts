import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Movements } from '../interfaces/movements.interface';

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  private http = inject(HttpClient);
  listmovem = signal<Movements[]>([]);

  constructor() {}

  listMovement(idProducto: number) {
    return this.http
      .get<Movements[]>(`${environment.ApiGCO}/movement/product/${idProducto}`)
      .subscribe((resp) => {
        this.listmovem.set(resp);
      });
  }

  findMovement(id: number) {
    return this.http.get<Movements>(`${environment.ApiGCO}/movement/${id}`);
  }

  addMovement(datamovem: Movements) {
    console.log(datamovem);
    return this.http.post<Movements>(
      `${environment.ApiGCO}/movement`,
      datamovem
    );
  }

  updateMovement(id: number, datamovem: Movements) {
    return this.http.put<Movements>(
      `${environment.ApiGCO}/movement/${id}`,
      datamovem
    );
  }

  deleteMovement(id: number) {
    return this.http.delete(`${environment.ApiGCO}/movement/${id}`, {
      responseType: 'text',
    });
  }
}
