import { Component, inject } from "@angular/core";
import { CategoryService } from "../category.service";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";

@Component({
    selector: 'app-category-list',
    imports: [NgIf, AsyncPipe, NgFor],
    template: `
        <ng-container *ngIf="categories$ | async as categories">
            <ul>
                <li *ngFor="let category of categories">{{category}}</li>
            </ul>
        </ng-container>
    `,
    standalone: true
})
export class CategoryListComponent {
    categoryService = inject(CategoryService);
    categories$ = this.categoryService.getCategories();

}