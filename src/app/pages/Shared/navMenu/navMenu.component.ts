import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'nav-menu',
  imports: [
    RouterLink, 
    RouterLinkActive
  ],
  templateUrl: './navMenu.component.html',
})
export class NavMenuComponent {


}
