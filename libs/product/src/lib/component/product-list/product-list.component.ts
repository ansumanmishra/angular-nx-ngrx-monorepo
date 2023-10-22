import { Component, Input, OnInit, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
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
        <h3>{{category | titlecase}}</h3>
        <hr />
        <ng-container *ngIf="products$ | async as products">
        <div class="row">
    <div class="col-md-6 col-lg-4 d-flex" *ngFor="let product of products ">
      <mat-card class="example-card">
        <div class="example-card-image">
          <img mat-card-image width=200 src="{{product.image}}" alt="Photo of a Shiba Inu">
        </div>
        <mat-card-header>
          <mat-card-title>{{product.title}}</mat-card-title>
          <mat-card-subtitle>{{product.price | currency}}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="flex-grow-1">
          <p class="word-break-all">
            {{product.description}}
          </p>
        </mat-card-content>
        <mat-card-actions class="example-card-actions">
          <button mat-raised-button color="primary" class="white-space-nowrap">Buy Now</button>
          <button mat-raised-button color="accent" class="white-space-nowrap">Add to Cart</button>
        </mat-card-actions>
      </mat-card>
    </div>
  </div>
        </ng-container>
  `,
  styles: [
    `
:host {
  display: block;
  padding-top: 1rem;
}

.example-card {
  margin-bottom: 1rem;
}

.example-card-image {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
  }
}

.example-card-actions {
  display: flex;
  flex-wrap: wrap;
  margin-left: -.25rem;
  margin-right: -.25rem;

  > * {
    margin: .25rem;
  }
}
    `,
  ],
  imports: [NgIf, NgFor, AsyncPipe, MatCardModule, MatButtonModule, CurrencyPipe, UpperCasePipe, TitleCasePipe],
})
export class ProductListComponent implements OnInit {
  @Input() set categoryName(categoryName: string) {
    if (categoryName) {
        this.category = categoryName;
      // Load products by category name
      this.store.dispatch(loadProductsByCategory({category: categoryName}));
    } else {
        // Load all products
        this.store.dispatch(loadProducts());
    }
    this.products$ = this.store.select(selectProducts);
  }
  category!: string;
  products$!: Observable<Product[]>;
  private store = inject(Store);

  ngOnInit(): void {
    
  }
}
