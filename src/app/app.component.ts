import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { NgIf } from '@angular/common';
import { ToastModule } from './toast/toast.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    NgIf,
    ToastModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router) {}

  title = 'ViajaSinEstres';

  hasNavbar() {
    return (this.router.url !== '/') && (this.router.url !== '/register');
  }
}
