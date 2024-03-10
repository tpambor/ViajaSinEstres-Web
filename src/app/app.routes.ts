import { Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LoginComponent } from './login/login.component';
import { AlarmListComponent } from './alarm-list/alarm-list.component';
import { CreateAlarmComponent } from './create-alarm/create-alarm.component';
import { EditAlarmComponent } from './edit-alarm/edit-alarm.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: UserRegistrationComponent },
    { path: 'alarms', component: AlarmListComponent },
    { path: 'createalarm', component: CreateAlarmComponent },
    { path: 'editalarm', component: EditAlarmComponent }
];
