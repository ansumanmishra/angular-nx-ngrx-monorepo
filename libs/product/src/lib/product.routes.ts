import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { provideState } from '@ngrx/store';
import { loadProducts$, productFeature } from '@angular-nx-ngrx-monorepo/common/store';
import { provideEffects } from '@ngrx/effects';
import { ProductContainerComponent } from './components/product-container/product-container.component';

export const productRoutes: Routes = [
  {
    path: '',
    component: ProductContainerComponent,
    providers: [
        provideState(productFeature),
        provideEffects({
            loadProducts$,
        }),
    ],
    children: [
        {
            path: '',
            component: ProductListComponent
        },
        {
            path: 'detail/:id',
            component: ProductDetailComponent,
        }
    ]
  },
];
