import { Product } from "@angular-nx-ngrx-monorepo/common/models";
import { filterProductsByCategory, filterProductsById, loadProducts, selectProducts } from "@angular-nx-ngrx-monorepo/common/store";
import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductsFacade {
    #isLoaded = false;
    #store = inject(Store);

    get products$(): Observable<Product[]> {
        this.#assertLoaded();

        return this.#store.select(selectProducts);  
    }

    getProductsByCategory(category: string): Observable<Product[]> {
        this.#assertLoaded();

        return this.#store.select(filterProductsByCategory(category));
    }

    getProductById(id: number): Observable<Product | undefined> {
        this.#assertLoaded();

        return this.#store.select(filterProductsById(id));
    }

    #assertLoaded() {
        if (!this.#isLoaded) {
            this.#store.dispatch(loadProducts());
            this.#isLoaded = true;
        }
    }
}