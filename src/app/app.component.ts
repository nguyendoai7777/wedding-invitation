import { Component, computed, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { layout } from './services/layout.service';

@Component({
  selector: 'invitation-wedding-app',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppRootComponent {
  private readonly layout = layout();
  readonly _ = computed(() => {
    const bg = this.layout.backgroundUrl()
    return bg
  });
  constructor() {
    effect(() => {
      const bg = this.layout.backgroundUrl()
      if(bg) {
        document.body.style.backgroundImage = `url(${bg})`;
      }
    }, {})
  }
}
