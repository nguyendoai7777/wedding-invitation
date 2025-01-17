import { Component, computed, inject, input, output, ViewEncapsulation } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ImgurImage } from '../../shared/imgur.types';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'wi-pick-images',
  imports: [
    JsonPipe
  ],
  templateUrl: './pick-images.component.html',
  styleUrl: './pick-images.component.less',
  encapsulation: ViewEncapsulation.None
})
export class PickImagesComponent {
  readonly images = input.required<ImgurImage[]>();
  readonly pick = output<ImgurImage>();
  private readonly bottomSheetRef = inject(MatBottomSheetRef);


  onPick(item: ImgurImage) {
    this.pick.emit(item)
    this.bottomSheetRef.dismiss()
  }
}
