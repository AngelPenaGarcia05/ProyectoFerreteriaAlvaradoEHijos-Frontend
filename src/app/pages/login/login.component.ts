import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authService = inject(AuthService);
  toastrService = inject(ToastrService);


  formLogin:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', [Validators.required])
  })


  constructor(private router: Router) {
    
  }
  onSubmit(){
    this.authService.login(this.formLogin.get('email')?.value, this.formLogin.get('contrasena')?.value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
        this.toastrService.success('Bienvenido');
      },
      error: (error) => {
        console.log('Error durante el login:' + error.message);
      }
    });
  }
  redirectToHome(){
    this.router.navigate(['/home']);
  }
}
