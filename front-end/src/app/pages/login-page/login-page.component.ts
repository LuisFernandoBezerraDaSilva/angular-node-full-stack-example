import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatSnackBarModule,
    SharedModule
  ],
  providers: [ 
    AuthService,
    StorageService
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService, 
    private storageService: StorageService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        this.storageService.setToken(response.token);
        this.router.navigate(['/list']);
      },
      error: (err) => {
        console.error('Login failed', err);
        this.snackBar.open('Senha incorreta!', 'Fechar', {
          duration: 3000,
        });
      }
    });
  }
}