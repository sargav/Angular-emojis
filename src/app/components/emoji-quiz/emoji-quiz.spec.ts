import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiQuiz } from './emoji-quiz';

describe('EmojiQuiz', () => {
  let component: EmojiQuiz;
  let fixture: ComponentFixture<EmojiQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmojiQuiz],
    }).compileComponents();

    fixture = TestBed.createComponent(EmojiQuiz);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
