import { ApplicationConfig, isDevMode } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes, withEnabledBlockingInitialNavigation(), withComponentInputBinding()), 
    provideAnimations(), provideHttpClient(), 
    provideStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode()}),
    provideEffects()
  ],
};
