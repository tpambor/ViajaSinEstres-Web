import { Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LoginComponent } from './login/login.component';
import { AlarmListComponent } from './alarm-list/alarm-list.component';
import { CreateAlarmComponent } from './create-alarm/create-alarm.component';
import { EditAlarmComponent } from './edit-alarm/edit-alarm.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'recover', component: RecoverPasswordComponent },
    { path: 'register', component: UserRegistrationComponent },
    { path: 'alarms', component: AlarmListComponent },
    { path: 'alarms/new', component: CreateAlarmComponent },
    { path: 'alarms/:id/edit', component: EditAlarmComponent }
];
