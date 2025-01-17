import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, output, ViewEncapsulation } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'wi-bottom-navigation',
  imports: [
    MatButton
  ],
  templateUrl: './bottom-navigation.component.html',
  styleUrl: './bottom-navigation.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: `flex h-[52px] items-center justify-around layout border-top border-[#c5c5c5] mx-auto`
  }
})
export class BottomNavigationComponent {
  readonly disableNext = input(true);
  readonly followRef = input.required<HTMLDivElement>();
  readonly next = output<void>();
  readonly dock = output<void>();
  private readonly elr = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    effect(() => {
      this.calculateWidth();
    });

    fromEvent(window, 'resize').pipe(debounceTime(200)).subscribe(() => {
        this.calculateWidth();
      }
    );
  }

  calculateWidth() {
    this.elr.nativeElement.style.width = `${this.followRef().clientWidth}px`;
  }
}

