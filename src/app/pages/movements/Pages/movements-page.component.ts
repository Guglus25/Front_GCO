import { Component, inject, signal } from '@angular/core';
import { MovementService } from '../Services/movement.service';
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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    InfoProductComponent,
  ],
  templateUrl: './movements-page.component.html',
})
export default class MovementsPageComponent {
  public movementService = inject(MovementService);
  dataMovemnt = signal<Movements | null>(null);
  showInfoProduct = true;

  id = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['id']))
  );
  idproducto = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['idproducto']))
  );

  formMovement: FormGroup;

  constructor() {
    this.formMovement = this.createForm();
    this.resetChild();
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
      this.movementService.findMovement(this.id()).subscribe((resp) => {
        this.formMovement.setValue({
          id: resp.id,
          descripcion: resp.descripcion,
          idproducto: resp.idProducto,
          tipo: resp.tipo,
          cantidad: resp.cantidad,
          fecha: resp.fecha,
        });
      });
    }
  }


resetChild() {
  this.showInfoProduct = false;
  setTimeout(() => this.showInfoProduct = true, 0); // Vuelve a montar el hijo
}

  addupdateMovement() {


    if (this.id() == 0)
      this.movementService.addMovement(this.formMovement.value).subscribe({
        next: (res) => {
          Swal.fire('Exito', 'El el movimiento se creo correctamente', 'success');
          this.formMovement.reset();
          this.resetChild()
        },
        error: (err) => console.error('Error al guardar el movimiento:', err),
      });
    else
      this.movementService
        .updateMovement(this.id(), this.formMovement.value)
        .subscribe({
          next: (res) => {
            this.formMovement.reset();
          },
          error: (err) => console.error('Error al guardar el movimiento:', err),
        });
  }
}
