import { Component, ElementRef, ViewChild } from '@angular/core';

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
  overlayVisible = false;
  content = [
    'Chào: ABC xyz',
    'Thân mời bạn (cùng xyz) tới ALocation để dự lễ Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam eius ipsa neque! Expedita fuga minima quod sed. Blanditiis ea ex illo magni quas rerum unde? Adipisci ex officiis provident.'
  ];

  chars: CharData[] = [];

  ngOnInit() {
    setTimeout(() => {
      this.overlayVisible = true;

    }, 1200);
    setTimeout(() => {
      this.initializeChars();
      this.startAnimation();
    }, 1500);

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
