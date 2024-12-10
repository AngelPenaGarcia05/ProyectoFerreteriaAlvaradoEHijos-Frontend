import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  authService = inject(AuthService);
  toastrService = inject(ToastrService);

  registerForm = new FormGroup({
    correo: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    telefono: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{9}$/)
    ]),
    dni: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{8}$/)
    ]),
    contrasena: new FormControl('', [
      Validators.required
    ]),
    direccion: new FormControl('', [
      Validators.required
    ])
  })

  constructor(private router: Router) {
    
  }
  onSubmit(){
    this.authService.register(
      this.registerForm.get('correo')?.value ?? '',
      this.registerForm.get('telefono')?.value ?? '',
      this.registerForm.get('dni')?.value ?? '',
      this.registerForm.get('contrasena')?.value ?? '',
      this.registerForm.get('direccion')?.value ?? ''
    ).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
        this.toastrService.success('Bienvenido');
      },
      error: (error) => {
        console.log('Error durante el login:' + error.message);
        this.toastrService.error(error.message);
      }
    });
  }
  redirectToHome(){
    this.router.navigate(['/home']);
  }
}
