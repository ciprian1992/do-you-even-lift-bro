import { Component, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-edit-max-weight-modal',
  templateUrl: 'add-edit-max-weight-modal.component.html',
  standalone: true,
  imports: [IonicModule],
})
export class AddEditMaxWeightModalComponent {
  private modalCtrl = inject(ModalController);

  public closeModal() {
    this.modalCtrl.dismiss();
  }
}
