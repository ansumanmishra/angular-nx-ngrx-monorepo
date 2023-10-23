import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";

interface LoginResponse {
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    #http = inject(HttpClient);
    isLoggedIn = signal(false);
    
    login(username: string, password: string) {
        const body = {
            username,
            password,
          };

        return this.#http.post<LoginResponse>('https://fakestoreapi.com/auth/login', body);
    }

    setIsLoggedIn() {
        this.isLoggedIn.set(true);
    }

}