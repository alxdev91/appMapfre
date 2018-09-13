import { Component, Input, OnInit } from '@angular/core';

/**
 * Generated class for the MessageInnerTextComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message-inner-text',
  templateUrl: 'message-inner-text.template.html'
})
export class MessageInnerTextComponent implements OnInit {

  @Input() public text: string;

  private messages: string[] = [];

  ngOnInit(): void {
    this.parseText();
  }

  private parseText () {
    if (this.text) {
      this.messages = this.text.split('\\n');
    }
  }

}
