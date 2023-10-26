import { Routes } from '@angular/router';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { provideState } from '@ngrx/store';
import { loadProducts$, productFeature } from '@angular-nx-ngrx-monorepo/common/store';
import { provideEffects } from '@ngrx/effects';

export const productRoutes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'detail/:id',
    component: ProductDetailComponent,
    providers: [
        provideState(productFeature),
        provideEffects({
            loadProducts$,
          }),
    ],

    
  },
];
