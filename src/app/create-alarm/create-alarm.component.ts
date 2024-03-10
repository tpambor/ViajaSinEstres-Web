import { Component } from "@angular/core";
import { RouterLink } from '@angular/router';
import { ToastService } from "../toast/toast.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-alarm',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './create-alarm.component.html',
  styleUrls: ['./create-alarm.component.css']
})
export class CreateAlarmComponent {
  constructor(private toastService: ToastService, private router: Router) {}

  createAlarm() {
    this.toastService.showSuccessToast("Se ha creado la alarma")
    this.router.navigateByUrl("/alarms");
  }
}
