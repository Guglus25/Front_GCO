import { Component, inject, signal } from '@angular/core';
import { MovementServiceService } from '../Services/movement.service.service';
import { Movements } from '../interfaces/movements.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { InfoProductComponent } from '../../product/Pages/components/infoProduct.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-movements',
  imports: [CommonModule,
    ReactiveFormsModule, 
    RouterLink,
    InfoProductComponent],
  templateUrl: './movements-page.component.html',
})
export default class MovementsPageComponent {
  public movementService = inject(MovementServiceService);
  dataMovemnt = signal<Movements | null>(null);

  id = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['id']))
  );
  idproducto = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['idproducto']))
  );

  formMovement: FormGroup;

  constructor() {
    this.formMovement = this.createForm();
  }

  
  createForm() {
    return new FormGroup({
      id: new FormControl(null),
      idProducto: new FormControl(this.idproducto()),
      tipo: new FormControl(''),
      cantidad: new FormControl(0),
      fecha: new FormControl(this.getTodayDate()),
      descripcion: new FormControl(''),
    });
  }
  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // yyyy-MM-dd
  }

  LoadInfo() {
    if (this.id() != 0) {
      this.movementService.findProduct(this.id()).subscribe((resp) => {
        this.formMovement.setValue({
          id: resp.id,          
          descripcion: resp.descripcion,
          idproducto:resp.idProducto,
          tipo:resp.tipo,
          cantidad:resp.cantidad,
          fecha:resp.fecha
        });
      });
    }
  }

  addupdateMovement() {
      // const producto: Product = this.formProduct.value;
  
      if (this.id() == 0)
        this.movementService.addProduct(this.formMovement.value).subscribe({
          next: (res) => {
            Swal.fire('Exito','El producto se creo correctamente','success');
            this.formMovement.reset();
          },
          error: (err) => console.error('Error al guardar producto:', err),
        });
        else
        this.movementService.updateProduct(this.id(),this.formMovement.value).subscribe({
          next: (res) => {
            this.formMovement.reset();
          },
          error: (err) => console.error('Error al guardar producto:', err),
        });
  
    }
}
