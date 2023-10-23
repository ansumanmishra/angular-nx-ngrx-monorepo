import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LoginService } from "./services/login.service";

export const authGuard: CanActivateFn = (): boolean | Promise<boolean> => {
    const isLoggedIn = inject(LoginService).isLoggedIn();
    const router = inject(Router);

    if(isLoggedIn) {
        return true;
    } else {
        return router.navigate(['/login']);
    }
};