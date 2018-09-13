import { EventEmitter, Output } from '@angular/core';

export class BaseMessage {

   //This will emit the cancel event that will block the input in case we want it to happen
  @Output() blockInput: EventEmitter<Object> = new EventEmitter(true);

  public locked: boolean = false;

   public toggleLock() {
    this.locked = !this.locked;
    this.blockInput.emit({ lock: this.locked });
  }
}
