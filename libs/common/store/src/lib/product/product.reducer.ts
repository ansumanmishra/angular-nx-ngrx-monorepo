import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import {
  loadProducts,
  loadProductsByCategory,
  loadProductsFailure,
  loadProductsSuccess,
} from './product.actions';
import { Product } from '@angular-nx-ngrx-monorepo/common/models';

enum LoadingStatus {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}

export interface ProductState {
  products: Product[];
  loadingStatus: LoadingStatus;
  error: string;
}

const initialState: ProductState = {
  products: [],
  loadingStatus: LoadingStatus.LOADING,
  error: '',
};

const productReducer = createReducer(
  initialState,
  on(loadProducts, (state) => {
    return {
      ...state,
      loadingStatus: LoadingStatus.LOADING,
    };
  }),
  on(loadProductsByCategory, (state) => {
    return {
      ...state,
      loadingStatus: LoadingStatus.LOADING,
    };
  }),
  on(loadProductsSuccess, (state, { products }) => {
    return {
      ...state,
      products: products,
      loadingStatus: LoadingStatus.LOADED,
    };
  }),
  on(loadProductsFailure, (state, { error }) => {
    return {
      ...state,
      products: [],
      loadingStatus: LoadingStatus.LOADED,
      error,
    };
  })
);

export const productFeature = createFeature({
  name: 'product',
  reducer: productReducer,
  extraSelectors: ({ selectProducts }) => {
    return {
      selectProducts,
      filterProductsById: (id: number) => {
        return createSelector(selectProducts, (products: Product[]) => {            
          return products?.find((product) => product.id === id);
        });
      },
      filterProductsByCategory: (category: string) => {
        return createSelector(selectProducts, (products: Product[]) => {            
          return products.filter((product) => product.category === category);
        });
      },
    };
  },
});

export const {
  selectError,
  selectLoadingStatus,
  selectProductState,
  selectProducts,
  filterProductsById,
  filterProductsByCategory
} = productFeature;
