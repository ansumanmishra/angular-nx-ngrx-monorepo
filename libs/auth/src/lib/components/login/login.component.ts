import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";


@Component({
    standalone: true,
    template: `
        <div class="login-form">
            <h1 class="login-form-title">Login</h1>
            <form [formGroup]="loginForm" (ngSubmit)="login()">
                <div class="login-form-content">
                    <mat-form-field appearance="outline" class="login-form-field">
                        <mat-label>Username</mat-label>
                        <input formControlName="username" matInput type="text" />
                    </mat-form-field>
                    <mat-form-field appearance="outline" class="login-form-field">
                        <mat-label>Password</mat-label>
                        <input formControlName="password" matInput type="password" />
                    </mat-form-field>
                    <button mat-raised-button color="primary" class="login-form-button" [disabled]="!loginForm.valid">Login</button>
                </div>
            </form>
        </div>
    `,
    styles: [`
        .login-form {
        width: 400px;
        margin: 0 auto;
        padding: 20px;
        }

        .login-form-title {
        font-size: 24px;
        font-weight: bold;
        }

        .login-form-content {
        padding: 20px 0;
        }

        .login-form-field {
        width: 100%;
        margin-bottom: 10px;
        }

        .login-form-button {
        width: 100%;
        margin-top: 10px;
        }
    `],
    imports: [MatCardModule, MatFormFieldModule, MatButtonModule, MatInputModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    #fb = inject(FormBuilder);
    #loginService = inject(LoginService);
    #router = inject(Router);

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.loginForm = this.#fb.group({
            username: ['mor_2314', Validators.required],
            password: ['83r5^_', Validators.required]
        });
    }

    login() {
        const {username, password} = this.loginForm.value;
        this.#loginService.login(username, password).subscribe(res => {
            if(res.token) {
                this.#loginService.setIsLoggedIn();                
                this.#router.navigate(['/']);
            }
        });
    }
}