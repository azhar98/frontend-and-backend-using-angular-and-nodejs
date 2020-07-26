import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PageTitleService {
  title = new Subject<string>();

  public changeTitle(title: string) {
    this.title.next(title);
  }
}
