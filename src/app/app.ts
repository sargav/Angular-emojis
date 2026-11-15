import { Component, signal } from '@angular/core';
import { EmojiQuiz } from './components/emoji-quiz/emoji-quiz';

@Component({
  selector: 'app-root',
  imports: [EmojiQuiz],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('emoji-project');
}
