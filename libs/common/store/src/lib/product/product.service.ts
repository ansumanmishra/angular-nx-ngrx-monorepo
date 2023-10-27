import { Product } from "@angular-nx-ngrx-monorepo/common/models";
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    http = inject(HttpClient);

    getProducts() {
        return this.http.get<Product[]>(`https://fakestoreapi.com/products`);
    }

/*     getProductsByCategory(categoryName: string) {
        return this.http.get<Product[]>(`https://fakestoreapi.com/products/category/${categoryName}`);
    } */
}