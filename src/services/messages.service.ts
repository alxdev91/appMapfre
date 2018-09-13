import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Message} from "app/classes/Message";
import {Observable} from "rxjs/Observable";

@Injectable()
export class MessagesService {


  private _messagesFeed:Subject<Message[]>;
  private messagesArray:Message[]=[];

  private _lastMessage:Subject<Message>;
  private message_last:Message=undefined;

  constructor(){

    this._messagesFeed = new Subject<Message[]>();
    this._lastMessage = new Subject<Message>();


  }
  public reset(){


    this.messagesArray = [];
    this.message_last = undefined;

    this._messagesFeed.next(this.messagesArray);
    this._lastMessage.next(this.message_last);


  }

  /**
   * Pass in a Message object value that will be appended at current's array end.
   * Also propagate changes in the model for everyone who's subscribed to the data.
   * @param {Message} message
   */
  public addMessage(message:Message){

    this.message_last = message;
    //Update the value of _lastMessage to propagate changes
    this._lastMessage.next(this.message_last);
    //Of course, update the whole array observer value
    this.messagesArray.push();
    this.messagesArray = [... this.messagesArray, this.message_last];
    this._messagesFeed.next(this.messagesArray);


  }

  /**
   * This method returns the value of the actual array
   * @returns {Message[]}
   */
  public getMessageList(){ return this.messagesArray }

  /**
   * This method returns an Observable pointing to this Service array data
   * @returns {Observable<Message[]>}
   */
  public getMessageListObserver():Observable<Message[]>{ return this._messagesFeed.asObservable(); }

  /**
   * This method returns the value of the actual array last item
   * @returns {Message}
   */
  public getLastMessage():Message{ return this.message_last; }

  /**
   * This method returns an Observable pointing to this Service array last item
   * @returns {Observable<Message>}
   */
  public getLastMessageObserver():Observable<Message>{ return this._lastMessage.asObservable(); }


}
