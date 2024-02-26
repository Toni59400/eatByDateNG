import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBar } from '@angular/material/progress-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  constructor(private snackBar: MatSnackBar) { }

  async showSuccess(message: string): Promise<void> {
    const snackBarRef = this.snackBar.open(message, 'Succès', {
      duration: 2000,
    });
    await snackBarRef.afterDismissed().toPromise();
  }

  async showError(message: string): Promise<void> {
    const snackBarRef = this.snackBar.open(message, 'Erreur', {
      duration: 2000,
      panelClass: ['error-snackbar']
    });
    await snackBarRef.afterDismissed().toPromise();
  }

  showProgressBar(color: string) {

  }

  hideProgressBar() {

  }
}
