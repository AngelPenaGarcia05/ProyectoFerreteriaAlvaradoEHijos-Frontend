import { Component, inject, ViewChild, viewChild } from '@angular/core';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { Proveedor } from '../../core/interfaces/proveedor';
import { ProveedorService } from '../../core/services/proveedor.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [NavbarComponent, ModalComponent, AsyncPipe, ReactiveFormsModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {
  proveedores!: Observable<Proveedor[]>;
  proveedorService = inject(ProveedorService);

  accionFormulario: string = '';
  botonLabel: string = '';

  @ViewChild('modal') modal!: ModalComponent;

  targetProveedorId: number = 0;

  proveedorForm: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    ruc: new FormControl('', Validators.required)
  });
  
  constructor() {
    this.loadProveedores();
  }
  loadProveedores() {
    this.proveedores = this.proveedorService.getProveedores();
  }
  onSubmit() {
    switch (this.accionFormulario) {
      case 'Agregar proveedor':
        this.guardarProveedor();
        this.modal.closeModal();
        break;
      case 'Editar proveedor':
        this.actualizarProveedor(this.targetProveedorId);
        this.modal.closeModal();
        break;
      default:
        break;
    }
  }
  guardarProveedor() {
    this.proveedorService.addProveedor(
      this.proveedorForm.get('nombre')?.value ?? '',
      this.proveedorForm.get('direccion')?.value ?? '',
      this.proveedorForm.get('telefono')?.value ?? '',
      this.proveedorForm.get('email')?.value ?? '',
      this.proveedorForm.get('ruc')?.value ?? ''
    ).subscribe({
      next: () => {
        this.loadProveedores();
        alert("Proveedor creado con éxito");
      },
      error: (error) => {
        console.log('Error durante la creación del proveedor: ' + error.message);
      }
    });
  }
  actualizarProveedor(id: number) {
    this.proveedorService.updateProveedor(
      id,
      this.proveedorForm.get('nombre')?.value ?? '',
      this.proveedorForm.get('direccion')?.value ?? '',
      this.proveedorForm.get('telefono')?.value ?? '',
      this.proveedorForm.get('email')?.value ?? '',
      this.proveedorForm.get('ruc')?.value ?? ''
    ).subscribe({
      next: () => {
        this.loadProveedores();
        alert("Proveedor actualizado con éxito");
      },
      error: (error) => {
        console.log('Error durante la actualización del proveedor: ' + error.message);
      }
    });
  }
  eliminarProveedor(id: number) {
    this.proveedorService.deleteProveedor(id).subscribe({
      next: () => {
        this.loadProveedores();
        alert("Proveedor eliminado con éxito");
      },
      error: (error) => {
        console.log('Error durante la eliminación del proveedor:' + error.message);
      }
    });
  }
  cleanForm() {
    this.proveedorForm.reset();
  }
  placeDataInForm(proveedor: Proveedor) {
    this.proveedorForm.patchValue({
      nombre: proveedor.nombre,
      direccion: proveedor.direccion,
      telefono: proveedor.telefono,
      email: proveedor.email,
      ruc: proveedor.ruc
    });
  }
}
