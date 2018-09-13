import {Component, Input} from '@angular/core';
import {Message} from 'app/classes/Message';


/**
 * Generated class for the MessageAbstract component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message-text',
  templateUrl: 'message_text.template.html'
})
export class MessageTextComponent {

  @Input() public message:Message;


  constructor() {




  }

}
