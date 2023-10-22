import { createFeature, createReducer, on } from "@ngrx/store";
import { Product } from "../models/product";
import { loadProducts, loadProductsByCategory, loadProductsFailure, loadProductsSuccess } from "./product.actions";

enum LoadingStatus {
    LOADING = 'LOADING',
    LOADED = 'LOADED'
}

export interface ProductState {
    products: Product[];
    loadingStatus: LoadingStatus;
    error: string;
}

const initialState: ProductState = {
    products: [],
    loadingStatus: LoadingStatus.LOADING,
    error: ''
};

const productReducer = createReducer(initialState,
        on(loadProducts, (state) => {
            return {
                ...state,
                loadingStatus: LoadingStatus.LOADING,
            }
        }),
        on(loadProductsByCategory, (state) => {
            return {
                ...state,
                loadingStatus: LoadingStatus.LOADING,
            }
        }),
        on(loadProductsSuccess, (state, {products}) => {                        
            return {
                ...state,
                products: products,
                loadingStatus: LoadingStatus.LOADED
            }
        }),
        on(loadProductsFailure, (state, {error}) => {            
            return {
                ...state,
                products: [],
                loadingStatus: LoadingStatus.LOADED,
                error
            }
        })
    )

export const productFeature = createFeature({
    name: 'product',
    reducer: productReducer
});

export const {
    selectError,
    selectLoadingStatus,
    selectProductState,
    selectProducts,
  } = productFeature;
