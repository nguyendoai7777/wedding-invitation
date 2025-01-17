import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AppQueryParams } from '../../shared/types';

interface CharData {
  value: string;
  lineIndex: number;
  isVisible: boolean;
  wordIndex: number;
}

@Component({
  selector: 'wi-invite',
  imports: [],
  templateUrl: './invite.component.html',
  styleUrl: './invite.component.less',
  host: {
    class: `relative`
  }
})
export class InviteComponent {
  @ViewChild('bluOverlay') bluOverlayRef!: ElementRef<HTMLDivElement>;

  private readonly ar = inject(ActivatedRoute);
  imgServer = 'https://i.imgur.com/';
  qp = this.ar.snapshot.queryParams as AppQueryParams;

  overlayVisible = false;
  content = [
    this.qp.subject,
    this.qp.content
  ];

  chars: CharData[] = [];
  isLoading = true;

  ngOnInit() {
    this.preloadImages([this.qp.i1, this.qp.i2, this.qp.i3, this.qp.i4]).then(() => {
      this.isLoading = false; // Ẩn loading khi tất cả ảnh đã tải
    });
    setTimeout(() => {
      this.overlayVisible = true;

    }, 1200);
    setTimeout(() => {
      this.initializeChars();
      this.startAnimation();
    }, 1500);

  }

  preloadImages(imageUrls: string[]): Promise<void> {
    const promises = imageUrls.map(url => this.loadImage(url));
    return Promise.all(promises).then(() => {
    });
  }

  loadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = this.imgServer + url;
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    });
  }

  initializeChars() {
    this.chars = [];
    this.content.forEach((line, lineIndex) => {
      // Tách dòng thành các từ
      const words = line.split(/(\s+)/);
      let wordIndex = 0;

      words.forEach(word => {
        [...word].forEach(char => {
          this.chars.push({
            value: char,
            lineIndex,
            wordIndex,
            isVisible: false
          });
        });
        wordIndex++;
      });
    });
  }

  startAnimation() {
    // Reset visibility
    this.chars.forEach(char => char.isVisible = false);

    // Start new animation
    this.chars.forEach((char, index) => {
      setTimeout(() => {
        char.isVisible = true;
      }, 35 * index);
    });
  }

  getWordsForLine(lineIndex: number): CharData[][] {
    const lineChars = this.chars.filter(char => char.lineIndex === lineIndex);
    const words: CharData[][] = [];
    let currentWord: CharData[] = [];

    lineChars.forEach(char => {
      currentWord.push(char);
      if (char.value === ' ') {
        words.push(currentWord);
        currentWord = [];
      }
    });

    if (currentWord.length > 0) {
      words.push(currentWord);
    }

    return words;
  }
}
