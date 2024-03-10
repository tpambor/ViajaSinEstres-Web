import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';
import { ToasterComponent } from './toaster/toaster.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    ToasterComponent
  ],
  providers: [
    ToastService
  ],
  declarations: [
    ToasterComponent,
    ToastComponent
  ],
})
export class ToastModule { }
