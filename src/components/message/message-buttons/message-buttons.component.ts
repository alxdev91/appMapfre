import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'app/classes/Message';
import { BaseMessage } from 'app/classes/BaseMessage';

/**
 * Generated class for the MessageButtonsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message-buttons',
  templateUrl: 'message-buttons.template.html'
})
export class MessageButtonsComponent extends BaseMessage implements OnInit {

  @Input() public message:Message;

  private isAllDone: boolean = false;

  private selectOption: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.toggleLock();
  }

  onSelectOption(option): void {
    this.isAllDone = true;
    this.selectOption = option.label;
    option.action && option.action();
  }

}
