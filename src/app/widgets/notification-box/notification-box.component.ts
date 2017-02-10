import { Component, OnInit } from '@angular/core';
import { Message } from "../../models/message";
import { MessagesService } from "../../services/messages.service";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: '.notificationsBox',
  templateUrl: './notification-box.component.html'
})
export class NotificationBoxComponent implements OnInit {

  private messages: Message[];
  current_user: User;

  constructor( private _user_serv : UserService, private _msg_serv:MessagesService ){
    this.messages = [];
    this._user_serv.current_user.subscribe((user: User) => this.current_user = user);
  }

  public ngOnInit() {
    //à chaque modification de message on change nos données
    this._msg_serv.messages.subscribe((msg: Message[])=>{
      console.log('reception de message');
      this.messages = msg;
    });
  }

}
