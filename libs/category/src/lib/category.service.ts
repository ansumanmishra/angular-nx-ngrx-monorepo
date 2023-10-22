import { Injectable, inject } from "@angular/core";
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    http = inject(HttpClient)

    getCategories() {
        return this.http.get<string[]>('https://fakestoreapi.com/products/categories');
    }
}