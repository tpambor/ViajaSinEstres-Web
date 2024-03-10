import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastService } from '../toast.service';
import { ToastEvent } from '../toastEvent';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToasterComponent implements OnInit {
  currentToasts: ToastEvent[] = [];

  constructor(private toastService: ToastService, private cdr: ChangeDetectorRef) { }

  subscribeToToasts() {
    this.toastService.toastEvents.subscribe((toasts) => {
      const currentToast: ToastEvent = {
        type: toasts.type,
        message: toasts.message,
      };
      this.currentToasts.push(currentToast);
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    this.subscribeToToasts();
  }

  dispose(index: number) {
    this.currentToasts.splice(index, 1);
    this.cdr.detectChanges();
  }
}
