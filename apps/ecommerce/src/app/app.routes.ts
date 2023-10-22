import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { loadProducts$, loadProductsByCategory$, productFeature } from '@angular-nx-ngrx-monorepo/product';
import { provideEffects } from '@ngrx/effects';

export const appRoutes: Route[] = [{
    path: '',
    loadComponent: () => import('@angular-nx-ngrx-monorepo/product').then((m) => m.ProductListComponent),
    providers: [
        provideState(productFeature),
        provideEffects({loadProducts$, loadProductsByCategory$})
    ]
}, {
    path: 'category/:categoryName',
    loadComponent: () => import('@angular-nx-ngrx-monorepo/product').then((m) => m.ProductListComponent),
    providers: [
        provideState(productFeature),
        provideEffects({loadProducts$, loadProductsByCategory$})
    ]
}];
