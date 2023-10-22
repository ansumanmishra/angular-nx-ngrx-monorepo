import { createAction, emptyProps, props } from '@ngrx/store';
import { Product } from '../models/product';

export const loadProducts = createAction(
    '[Product Page] Load products',
    emptyProps
);

export const loadProductsByCategory = createAction(
    '[Product Page] Load products by category',
    props<{category: string}>()
)

export const loadProductsSuccess = createAction(
    '[Product Page] Load products Success',
    props<{products: Product[]}>()
)

export const loadProductsFailure = createAction(
    '[Product Page] Load products Failure',
    props<{error: string}>()
)