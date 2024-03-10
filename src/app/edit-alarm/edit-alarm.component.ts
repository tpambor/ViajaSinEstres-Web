import { Component } from "@angular/core";
import { ActivatedRoute, RouterLink, RouterModule, Router } from '@angular/router';
import { ToastService } from "../toast/toast.service";
import { Alarm } from '../alarm';
import { ALARMS } from '../alarms';

@Component({
  selector: 'app-edit-alarm',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule
  ],
  templateUrl: './edit-alarm.component.html',
  styleUrls: ['./edit-alarm.component.css']
})
export class EditAlarmComponent {
  alarm!: Alarm;

  constructor(
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    let alarmId = Number(this.route.snapshot.paramMap.get('id'))!;
    this.alarm = ALARMS.find(alarm => alarm.id === alarmId)!;

    console.log(this.alarm)
  }

  editAlarm() {
    this.toastService.showSuccessToast("Se ha editado la alarma")
    this.router.navigateByUrl("/alarms");
  }
}
