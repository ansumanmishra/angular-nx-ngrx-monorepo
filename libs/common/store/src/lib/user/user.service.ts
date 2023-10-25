import { User } from "@angular-nx-ngrx-monorepo/common/models";
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    #http = inject(HttpClient);

    getUserProfile() {
        return this.#http.get<User>('https://fakestoreapi.com/users/2');
    }
}