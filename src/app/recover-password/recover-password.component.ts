import { Component } from "@angular/core";
import { RouterLink } from '@angular/router';
import { ToastService } from "../toast/toast.service";
import { Router } from '@angular/router';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css'
})
export class RecoverPasswordComponent {
  constructor(private toastService: ToastService, private router: Router) {}

  recoverPassword() {
    this.toastService.showSuccessToast("Se han enviado instrucciones para la recuperación de tu contraseña a tu correo electrónico.")
    this.router.navigateByUrl("/");
  }
}
