import { Component, Input, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'
import { Store } from '@ngrx/store';
import { loadProducts, loadProductsByCategory } from '../../store/product.actions';
import { selectProducts } from '../../store/product.reducer';

@Component({
  selector: 'app-product-list',
  standalone: true,
  template: `
        <ng-container *ngIf="products$ | async as products">
        <div class="card-container">
            <div *ngFor="let product of products" class="card-wrapper">
            <mat-card class="example-card">
                <mat-card-header>
                <mat-card-title>{{ product.title }}</mat-card-title>
                <mat-card-subtitle>Dog Breed</mat-card-subtitle>
                </mat-card-header>
                <img mat-card-image [src]="product.image" [alt]="product.title" />
                <mat-card-content>
                <p>{{ product.description }}</p>
                </mat-card-content>
                <mat-card-actions>
                <button mat-button>Add to cart</button>
                <button mat-button>Buy</button>
                </mat-card-actions>
            </mat-card>
            </div>
        </div>
        </ng-container>

  `,
  styles: [
    `
      .example-card {
        max-width: 400px;
      }

      .card-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 20px; /* Adjust the gap as needed */
    }
    `,
  ],
  imports: [NgIf, NgFor, AsyncPipe, MatCardModule, MatButtonModule],
})
export class ProductListComponent implements OnInit {
  @Input() set categoryName(categoryName: string) {
    if (categoryName) {
      // Load products by category name
      this.store.dispatch(loadProductsByCategory({category: categoryName}));
    } else {
        // Load all products
        this.store.dispatch(loadProducts());
    }
    this.products$ = this.store.select(selectProducts);
  }

  products$!: Observable<Product[]>;
  private store = inject(Store);

  ngOnInit(): void {
    
  }
}
