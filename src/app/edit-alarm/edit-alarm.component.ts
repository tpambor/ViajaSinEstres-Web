import { Component } from "@angular/core";
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
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
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let alarmId = Number(this.route.snapshot.paramMap.get('id'))!;
    this.alarm = ALARMS.find(alarm => alarm.id === alarmId)!;

    console.log(this.alarm)
  }
}
