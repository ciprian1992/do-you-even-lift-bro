import { Component, Input } from '@angular/core';
import {
  SegmentChangeEventDetail,
  SegmentValue,
  SegmentCustomEvent,
} from '@ionic/angular';

@Component({
  selector: 'app-max-weight-container',
  templateUrl: './max-weight-container.component.html',
  styleUrls: ['./max-weight-container.component.scss'],
})
export class MaxWeightContainerComponent {
  public exerciseTypeChanged(event: SegmentCustomEvent): void {}
}
