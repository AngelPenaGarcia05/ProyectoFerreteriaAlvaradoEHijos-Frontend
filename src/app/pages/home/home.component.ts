import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../core/services/email.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NavbarComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  correoFerreteria: string = 'alvaradoehijos@hotmail.com';

  emailService = inject(EmailService);

  formMail: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required)
  });

  
  validInputs(controlName:string, controlType:string) {
    switch (controlType) {
      case 'text':
        if((this.formMail.get('name')?.hasError('required') || this.formMail.get('name')?.hasError('maxlength')) &&
        this.formMail.get('name')?.touched){
          return 'invalid-input';
        }
        return '';
      case 'email':
        if((this.formMail.get('email')?.hasError('required') || this.formMail.get('email')?.hasError('email')) &&
        this.formMail.get('email')?.touched){
          return 'invalid-input';
        }
        return '';
      case 'textarea':
        if(this.formMail.get('message')?.hasError('required') &&
        this.formMail.get('message')?.touched){
          return 'invalid-input';
        }
        return '';
      default:
        return '';
    }
  }
  constructor(private router: Router) {
  }
  ngOnInit() {
    
  }

  sendMessage() {
    this.emailService.sendEmail(
      this.formMail.get('email')?.value,
      this.formMail.get('name')?.value,
      this.formMail.get('message')?.value
    ).subscribe({
      next: () => {
        alert('Mensaje enviado correctamente');
      },
      error: (error) => {
        console.log('Error durante el envio del mensaje:' + error.message);
        alert(error.message);
      }
    });
  }

  openCategoryRoute(categoria: string) {
    this.router.navigate(['/productos'], {
      queryParams: { categoria: categoria },
      queryParamsHandling: 'merge'
    });
  }
}
