import { inject, Injectable, signal } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  backgroundUrl = signal('')

  listen() {
    fromEvent(window, 'resize').pipe(
      debounceTime(200),
    ).subscribe(() => {

    })
  }
}

export const layout = () => inject(LayoutService);
