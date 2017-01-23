import { Component, OnInit } from '@angular/core';
import { Message } from "../../models/message";
import { MessagesService } from "../../services/messages.service"

@Component({
  selector: '.notificationsBox',
  templateUrl: './notification-box.component.html'
})
export class NotificationBoxComponent implements OnInit {

  private messages: Message[];

  constructor( private _msg_serv:MessagesService ){
    this.messages = [];
  }

  public ngOnInit() {
    //à chaque modification de message on change nos données
    this._msg_serv.messages.subscribe((msg: Message[])=>{
      console.log('reception de message');
      this.messages = msg;
    });
  }

}
