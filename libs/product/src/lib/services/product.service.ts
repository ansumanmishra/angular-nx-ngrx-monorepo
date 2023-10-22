import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Product } from "../models/product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    http = inject(HttpClient);

    getProducts() {
        return this.http.get<Product[]>(`https://fakestoreapi.com/products`);
    }

    getProductsByCategory(categoryName: string) {
        return this.http.get<Product[]>(`https://fakestoreapi.com/products/category/${categoryName}`);
    }
}