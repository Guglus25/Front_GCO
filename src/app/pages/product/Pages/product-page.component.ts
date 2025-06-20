import { Component, inject, OnInit, signal } from '@angular/core';
import {  
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,  
} from '@angular/forms';
import { ProductService } from '../Services/Product.service';
import { Product } from '../interfaces/Product.interface';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'ProductPage',
  imports: [CommonModule,ReactiveFormsModule, RouterLink],
  templateUrl: './product-page.component.html',
})
export default class ProductPageComponent implements OnInit {
  public productService = inject(ProductService);
  dataProduct = signal<Product | null>(null);

  id = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['id']))
  );

   formProduct: FormGroup;
  constructor() {
    this.formProduct = this.createForm();
  }  

  createForm() {
    return new FormGroup({
      id: new FormControl(null),
      nombre: new FormControl('', [Validators.required,]),
      descripcion: new FormControl('',Validators.required),
      precio: new FormControl(null,[Validators.required,Validators.min(1)]),
      stock: new FormControl(null,[Validators.required,Validators.min(1)]),
      categoria: new FormControl('',Validators.required),
      codigo: new FormControl('',Validators.required),
      fechaCreacion: new FormControl(this.getTodayDate()),
    });
  }
  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // yyyy-MM-dd
  }

  ngOnInit(): void {
    this.LoadInfo();
  }

  LoadInfo() {
    if (this.id() != 0) {
      this.productService.findProduct(this.id()).subscribe((resp) => {
        this.formProduct.setValue({
          id: resp.id,
          nombre: resp.nombre,
          descripcion: resp.descripcion,
          precio: resp.precio,
          stock: resp.stock,
          categoria: resp.categoria,
          codigo: resp.codigo,
          fechaCreacion: resp.fechaCreacion,
        });
      });
    }
  }

  addupdateProduct() {
    // const producto: Product = this.formProduct.value;
 const formValues = this.formProduct.getRawValue();
    if (this.id() == 0)
      this.productService.addProduct(formValues).subscribe({
        next: (res) => {
          Swal.fire('Exito','El producto se creo correctamente','success');
          this.formProduct.reset();
          this.createForm();
        },
        error: (err) => console.error('Error al guardar producto:', err),
      });
      else
      this.productService.updateProduct(this.id(),this.formProduct.value).subscribe({
        next: (res) => {
          Swal.fire('Exito','El producto se actualizo correctamente','success');
          this.formProduct.reset();
        },
        error: (err) => console.error('Error al guardar producto:', err),
      });

  }
}
