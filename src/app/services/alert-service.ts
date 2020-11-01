import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AlertToastComponent} from '../alert/alert-toast/alert-toast.component';
import {AlertMessage} from '../model/alert';

@Injectable()
export class AlertService {

  constructor(private snackBar: MatSnackBar) {
  }

  showError(message: string): void {
    const msg = new AlertMessage(AlertMessage.ERROR, message);
    this.snackBar.openFromComponent(AlertToastComponent, {data: msg, duration: 4 * 1000});
  }

  showSuccess(message: string, duration: number): void {
    const msg = new AlertMessage(AlertMessage.SUCCESS, message);
    this.snackBar.openFromComponent(AlertToastComponent, {data: msg, duration});
  }
}
