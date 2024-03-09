import { Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LoginComponent } from './login/login.component';
import { AlarmListComponent } from './alarm-list/alarm-list.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: UserRegistrationComponent },
    { path: 'alarms', component: AlarmListComponent }
];
