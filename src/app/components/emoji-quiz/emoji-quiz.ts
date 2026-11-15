import { Component, inject, OnInit ,ChangeDetectorRef} from '@angular/core';
import { Emoji } from '../../emoji';
import { EmojiService } from '../../services/emoji';
@Component({
  selector: 'app-emoji-quiz',
  imports: [],
  templateUrl: './emoji-quiz.html',
  styleUrl: './emoji-quiz.css',
})
export class EmojiQuiz implements OnInit {
  private emojiService = inject(EmojiService);
  private cdr = inject(ChangeDetectorRef);

  emojiList: Emoji[] = [];
  emojis6: Emoji[] = [];
  theCorrectAns: Emoji | null = null;
  counter: number = 0;
  countGood: number = 0;

  ngOnInit(): void {
    this.emojiService.getEmojis().subscribe(
      (emojis) => {
        this.emojiList = emojis;
       this.startGame();

        console.log('All emojis:', this.emojiList.length);
        console.log('Selected emojis:', this.emojis6.length);
        console.log('Selected array:', this.emojis6);
        console.log('num of the current emoji:', this.counter);
      });
  }
  startGame() {
    const name= prompt("Enter your name:");
    if(name) {
      localStorage.setItem('playerName', name);
      this.generateQuestion();
      this.cdr.detectChanges();
    }
    else{
      this.startGame();
    }
  }
  generateQuestion() {
    this.emojis6 = [];
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * this.emojiList.length);
      if (!this.emojis6.includes(this.emojiList[randomIndex]))
        this.emojis6.push(this.emojiList[randomIndex]);
      else
        i--;

    }
    this.theCorrectAns = this.emojis6[Math.floor(Math.random() * 6)];
  }
  finishGame() {
    this.emojis6=[];
    this.theCorrectAns = null;
    this.cdr.detectChanges();

  }
  isChozen(emoji: Emoji){
    if(emoji === this.theCorrectAns){
      this.countGood++;
      alert("Correct!");
    } else {
      alert("Wrong! The correct answer was: " + this.theCorrectAns?.char);
    }

    this.counter++;
    if(this.counter >= 3){
      alert("Game over! Your score: " + this.countGood + "/" + this.counter);
      const maxmax= localStorage.getItem('maxScore') ? parseInt(localStorage.getItem('maxScore')!) : 0;
      if(this.countGood > maxmax){
        alert("New high score!");
      }
      const maxScore = Math.max(maxmax, this.countGood);
      localStorage.setItem('maxScore', maxScore.toString());
      this.counter = 0;
      this.countGood = 0;
      const ask = confirm("Do you want to play again?");
      if(ask){
      this.generateQuestion();
      } else {
        alert("Thanks for playing!");
      this.finishGame();
    }

    }
    else{
      this.generateQuestion();
    }
    

  }
}