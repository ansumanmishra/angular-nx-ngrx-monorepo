import { createActionGroup, createFeature, createReducer, emptyProps, on, props } from "@ngrx/store";
import { LoadingStatus, User } from '@angular-nx-ngrx-monorepo/common/models';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { inject } from "@angular/core";
import { catchError, concatMap, map, of } from "rxjs";
import { UserService } from "./user.service";

// Define actions
export const userActions = createActionGroup({
    source: 'User',
    events: {
        loadUserProfile: emptyProps(),
        loadUserProfileSuccess: props<{user: User}>(),
        loadUserProfileError: props<{error: string}>()
    }
});

// Define initial state & reducer
interface UserState {
    user: User | undefined;
    error: string;
    loading: LoadingStatus;
}

const initialState: UserState = {
    user: undefined,
    error: '',
    loading: LoadingStatus.NOT_LOADED
}

const reducer = createReducer(initialState, 
    on(userActions.loadUserProfile, (state) => {
        return {
            ...state,
            loading: LoadingStatus.LOADING
        }
    }),
    on(userActions.loadUserProfileSuccess, (state, {user}) => {        
        return {
            ...state,
            loading: LoadingStatus.LOADED,
            user
        }
    }),
    on(userActions.loadUserProfileError, (state, {error}) => {
        return {
            ...state,
            loading: LoadingStatus.LOADED,
            error
        }
    })
)

export const userfeature = createFeature({
    name: 'user',
    reducer
});

export const {
    selectUser
  } = userfeature;


// Define effects
export const loadUserProfile$ = createEffect(
    (actions = inject(Actions), userService = inject(UserService)) => {
        return actions.pipe(
            ofType(userActions.loadUserProfile),
            concatMap( () => userService.getUserProfile().pipe(
                    map( (user: User) => userActions.loadUserProfileSuccess({user})),
                    catchError( error => of(userActions.loadUserProfileError({error})))
                )
            )
        )
    }, {
    functional: true
});