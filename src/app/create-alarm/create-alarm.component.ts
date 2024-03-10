import { Component } from "@angular/core";
import { RouterLink } from '@angular/router';


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

}
