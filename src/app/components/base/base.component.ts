import { Component } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
})
export class BaseComponent {
  title = 'MEAN Blog';

  constructor(
    private pageTitleService: PageTitleService,
    private flashMessage: FlashMessagesService
  ) {
    pageTitleService.title
      .subscribe(title => {
        this.title = title;
      });
  }

  

}
