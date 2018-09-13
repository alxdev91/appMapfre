import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Message} from 'app/classes/Message';
import * as GLOBALS from 'app/app.constants';

/**
 * Generated class for the MessageAbstract component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message-component',
  templateUrl: 'message_abstract.template.html'
})

export class MessageAbstract {

  @Input() public message:Message;

  @Output() public blockInputConnector = new EventEmitter(true);

  public audioIntentType:string = GLOBALS.MESSAGE_AUDIO_INTENT;
  public videoIntentType:string = GLOBALS.MESSAGE_VIDEO_INTENT;
  public matricula1IntentType:string = GLOBALS.MESSAGE_MATRICULA1_INTENT;
  public matricula2IntentType:string = GLOBALS.MESSAGE_MATRICULA2_INTENT;
  public textType:string = GLOBALS.MESSAGE_TEXT;
  public buttonsType:string = GLOBALS.MESSAGE_BUTTONS;
  public cameraIntentType:string = GLOBALS.MESSAGE_CAMERA_INTENT;
  public dniIntentType:string = GLOBALS.MESSAGE_DNI_INTENT;
  public phoneFormType:string = GLOBALS.MESSAGE_PHONE_FORM;

  constructor() {}

  public blockInput(event){
    console.log(event);
    this.blockInputConnector.emit(event);
  }

}
