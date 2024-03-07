import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        if (this.authService.getToken()) {
            console.log("Token encontrado");
            return true;
        } else {
            console.log("Token não encontrado, redirecionando para /home");
            this.router.navigate(['/home']);
            return false;
        }
    }
}
