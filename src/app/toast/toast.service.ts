import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EventTypes, ToastEvent } from './toastEvent';

@Injectable()
export class ToastService {
  toastEvents: Observable<ToastEvent>;
  private _toastEvents = new Subject<ToastEvent>();

  constructor() {
    this.toastEvents = this._toastEvents.asObservable();
  }

  showSuccessToast(message: string) {
    this._toastEvents.next({
      type: EventTypes.Success,
      message,
    });
  }
}
