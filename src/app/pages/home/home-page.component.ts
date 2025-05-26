import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { NavMenuComponent } from '../Shared/navMenu/navMenu.component';
import { CommonModule } from '@angular/common';
import { filter, map, Observable } from 'rxjs';

@Component({
  imports: [CommonModule, RouterOutlet, NavMenuComponent],
  templateUrl: './home-page.component.html',
})
export default class HomePageComponent {
  currentUrl = Observable<string>;

  constructor(private router: Router, private route: ActivatedRoute) {}

  isValidRoute(): boolean {
    if (this.router.url == '/home') return true;
    else return false;
  }
}
