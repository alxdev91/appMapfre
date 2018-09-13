import { Component, Input } from '@angular/core';
import { Message } from 'app/classes/Message';
import { BaseMessage } from 'app/classes/BaseMessage';
import { ContextGateController } from 'services/context-gate-controller.service';
import { ParteService } from 'services/parte.service';

/**
 * Generated class for the MessagePhoneFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message-phone-form',
  host: {
    class: 'message-phone-form'
  },
  templateUrl: 'message-phone-form.template.html'
})
export class MessagePhoneFormComponent {

  @Input() public message: Message;

  private phoneNumber: string;

  private isAllDone: boolean = false;

  private requiredPhoneNumber: boolean = false;

  private isValidPhone: boolean = true;

  private noGivePhone: boolean = false;

  constructor(
    private gate: ContextGateController,
    private parte: ParteService
  ) {}

  sendPhoneNumber ():void {

    this.isValidPhone = this.checkPhoneNumber();
    if (this.isValidPhone) {
      this.isAllDone = true;
      this.parte.contrario.telefono = this.phoneNumber;
      this.gate.sendInvisibleMessage(this.parte.getPhoneNumber());

    }
  }

  private resetValidation(): void {
    this.isValidPhone = true;
  }

  noGivePhoneNumber(): void {
    this.phoneNumber = '';
    this.isAllDone = true;
    this.noGivePhone = true;
    this.gate.sendInvisibleMessage(this.parte.getNoMeLoDa());
  }

  private checkPhoneNumber(): boolean {
    if(!this.phoneNumber) {
      return false;
    }
    const regExp = /^\+\d{1,15}$/;
    return regExp.test(this.phoneNumber);
  }

}
