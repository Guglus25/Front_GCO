import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from '../Shared/navMenu/navMenu.component';


@Component({
  imports: [RouterOutlet,NavMenuComponent],
  templateUrl: './home-page.component.html',
})
export default class HomePageComponent {}
