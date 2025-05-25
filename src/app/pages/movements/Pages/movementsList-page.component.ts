import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MovementServiceService } from '../Services/movement.service.service';

@Component({
  selector: 'app-movements-list-page',
  imports: [CommonModule, RouterLink, SweetAlert2Module],
  templateUrl: './movementsList-page.component.html',  
})
export default class MovementsListPageComponent { 
movementService = inject(MovementServiceService);


}
