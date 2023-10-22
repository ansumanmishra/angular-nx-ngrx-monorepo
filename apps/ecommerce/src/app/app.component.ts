import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';

@Component({
  standalone: true,
  imports: [RouterModule, NavComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ecommerce';
}
