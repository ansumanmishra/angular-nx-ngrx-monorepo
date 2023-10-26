import { Product } from "@angular-nx-ngrx-monorepo/common/models";
import { filterProductsById, loadProducts } from "@angular-nx-ngrx-monorepo/common/store";
import { AsyncPipe, CurrencyPipe, JsonPipe, NgIf } from "@angular/common";
import { Component, Input, OnInit, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
    selector: 'app-product-detail',
    template: `
        <ng-container *ngIf="productDetailById$ | async as product">
            <h1>{{product.title}}</h1>
            <h3>{{product.price | currency}}</h3>
            <img mat-card-image width=400 src="{{product.image}}" alt="">
            <p>{{product.description}}</p>
            <p>
                <button mat-raised-button color="primary" class="white-space-nowrap">Buy Now</button> &nbsp;
                <button mat-raised-button color="accent" class="white-space-nowrap">Add to Cart</button>
            </p>
        </ng-container>
    `,
    imports: [AsyncPipe, JsonPipe, NgIf, CurrencyPipe, MatButtonModule],
    standalone: true
})
export class ProductDetailComponent implements OnInit {
    @Input() id!: number;
    #store = inject(Store);
    productDetailById$!: Observable<Product | undefined>;

    ngOnInit(): void {
        this.#store.dispatch(loadProducts());
        this.productDetailById$ = this.#store.select(filterProductsById(this.id));
    }
}