import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, OnInit, signal, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { BottomNavigationComponent } from '../../components/bottom-navigation/bottom-navigation.component';
import { MatRipple } from '@angular/material/core';
import { dataService } from '../../services/data.service';
import { imgur } from '../../services/imgur.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PickImagesComponent } from '../../components/pick-images/pick-images.component';
import { ImgurImage } from '../../shared/imgur.types';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { imgurImageEndpoint } from '../../shared/helper';
import { AppQueryParams } from '../../shared/types';
import { layout } from '../../services/layout.service';
import { LoadingComponent } from '../../components/loading/loading.component';

export interface ChooseImagePlace {
  file: File | null;
  previewUrl?: string;
  type: 'vertical' | 'horizontal';
  id: number;
}

const DEFAULT_V: ChooseImagePlace[] = [
  {
    file: null,
    type: 'vertical',
    id: 1
  },
  {
    file: null,
    type: 'vertical',
    id: 2
  },
  {
    file: null,
    type: 'vertical',
    id: 3
  },
  {
    file: null,
    type: 'vertical',
    id: 4
  }
];

@Component({
  selector: 'wi-create',
  imports: [
    BottomNavigationComponent,
    MatRipple,
    PickImagesComponent,
    FormsModule,
    LoadingComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: ``,
  host: {
    class: `flex h-[100svh] flex-col justify-between`
  }
})
export class CreateComponent implements OnInit {
  @ViewChild('bluOverlay') bluOverlayRef!: ElementRef<HTMLDivElement>;

  private readonly data$$ = dataService();
  private readonly imgur = imgur();
  private readonly bottomSheet = inject(MatBottomSheet);
  private readonly router = inject(Router);
  private readonly layout = layout();

  readonly imageLayout = signal<ChooseImagePlace[]>(DEFAULT_V);
  readonly step = signal(1);
  readonly readyForPlay = computed(() => this.imageLayout().every(c => c.previewUrl));
  overlayVisible = false;
  imgurImages: ImgurImage[] = [];

  currentChooseImageId = 0;
  subject = 'Chào ';
  setForList = true;

  openChooseImage(input: HTMLInputElement, img: ChooseImagePlace) {
    // input.click();
    this.currentChooseImageId = img.id;
  }

  openPickImage(ref: TemplateRef<any>, img: ChooseImagePlace) {
    this.setForList = true;
    this.bottomSheet.open(ref, {
      autoFocus: false
    });
    this.currentChooseImageId = img.id;
  }

  openPickBackgroundImage(ref: TemplateRef<any>) {
    this.setForList = false;
    this.bottomSheet.open(ref);
  }

  ngOnInit() {
    this.imgur.getList().subscribe(res => {
      this.imgurImages = res;
    });

  }

  gotoFillContentStep() {
    this.step.set(2);
    this.overlayVisible = true;
  }

  pluckImage(index: number) {
    return this.imageLayout()[index].previewUrl!;
  }

  gotoPlay() {
    const subject = document.querySelector('#subject')?.textContent;
    const content = document.querySelector('#content')?.textContent;
    void this.router.navigate(['/invite'], {
      queryParams: <AppQueryParams>{
        subject,
        content,
        i1: imgurImageEndpoint(this.pluckImage(0)),
        i2: imgurImageEndpoint(this.pluckImage(1)),
        i3: imgurImageEndpoint(this.pluckImage(2)),
        i4: imgurImageEndpoint(this.pluckImage(3))
      }
    });
  }

  dock() {
    this.data$$.updateImages(1).subscribe(data => {
    });

  }

  setImageTo(ig: ImgurImage) {
    if (this.setForList) {
      const f = this.imageLayout().findIndex(c => c.id === this.currentChooseImageId);
      this.imageLayout.update(c => {
        c[f] = {
          ...c[f],
          previewUrl: ig.link,
          type: ig.width >= ig.height ? 'horizontal' : 'vertical'
        };
        return [...c];
      });
      return;
    }
    this.layout.backgroundUrl.set(ig.link)
  }
}
