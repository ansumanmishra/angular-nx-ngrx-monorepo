import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ProductListComponent, loadProducts$, loadProductsByCategory$, productFeature } from '@angular-nx-ngrx-monorepo/product';
import { LoginComponent, authGuard } from '@angular-nx-ngrx-monorepo/auth';

export const appRoutes: Route[] = [{
    path: '',
    component: ProductListComponent,
    providers: [
        provideState(productFeature),
        provideEffects({loadProducts$, loadProductsByCategory$})
    ]
}, {
    path: 'category/:categoryName',
    // loadComponent: () => import('@angular-nx-ngrx-monorepo/product').then((m) => m.ProductListComponent),
    component: ProductListComponent,
    providers: [
        provideState(productFeature),
        provideEffects({loadProducts$, loadProductsByCategory$})
    ],
    // canActivate: [authGuard]
},
{
    path: 'login',
    component: LoginComponent
}
];

// For lazy loading it says - error  Static imports of lazy-loaded libraries are forbidden.
// To get around with this error we could do the following:
// Option 1:
// Instead of static imports, we can do:
/* providers: [
    async () => (await import('@angular-nx-ngrx-monorepo/product')).productFeature,
    async () => (await import('@angular-nx-ngrx-monorepo/product')).loadProducts$,
    async () => (await import('@angular-nx-ngrx-monorepo/product')).loadProductsByCategory$
]
*/

// Option 2:

// create a new file product-imports.ts
// import { productFeature, loadProducts$, loadProductsByCategory$ } from '@angular-nx-ngrx-monorepo/product';
// Then import the effects and features from this file
/* import { productImports } from './product-imports';
// providers: [
    productFeature,
    loadProducts$,
    loadProductsByCategory$
]
*/