import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from '@angular-nx-ngrx-monorepo/category';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CategoryListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
