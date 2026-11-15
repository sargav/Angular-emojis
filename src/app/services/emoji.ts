import { inject, Injectable } from '@angular/core';
import { Emoji } from '../emoji';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class EmojiService {


  private http = inject(HttpClient);


  getEmojis(): Observable<Emoji[]> {
    return this.http.get<Emoji[]>('https://unpkg.com/emoji.json@16.0.0/emoji.json')
  }
}
