import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadProducts, loadProductsByCategory, loadProductsFailure, loadProductsSuccess } from "./product.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { Product } from "@angular-nx-ngrx-monorepo/common/models";
import { ProductService } from "./product.service";

export const loadProducts$ = createEffect(
    (actions = inject(Actions), productService = inject(ProductService)) => {
        return actions.pipe(
            ofType(loadProducts),
            exhaustMap( () => productService.getProducts().pipe(
                    map( (products: Product[]) => loadProductsSuccess({products: products})),
                    catchError((error) => {
                        return of(loadProductsFailure({ error }))
                    })
                )
            )
        )
    },
    {
        functional: true
    }
);

export const loadProductsByCategory$ = createEffect(
    (actions = inject(Actions), productService = inject(ProductService)) => {
        return actions.pipe(
            ofType(loadProductsByCategory),
            exhaustMap( (action) => productService.getProductsByCategory(action.category).pipe(
                    map( (products: Product[]) => loadProductsSuccess({products: products})),
                    catchError((error) => {
                        return of(loadProductsFailure({ error }))
                    })
                )
            )
        )
    },
    {
        functional: true
    }
);