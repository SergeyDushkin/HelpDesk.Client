import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'menu-aside',
  templateUrl: 'menu-aside.component.html',
  styleUrls: ['menu-aside.component.css']
})
export class MenuAsideComponent implements OnInit {
  private current_user: User;
  private current_url: string;
  private links: Array<any> = [
    {
      "title": "Заявки",
      "icon": "dashboard",
      "link": ['/tickets']
    },
    {
      "title": "Архив заявок",
      "icon": "dashboard",
      "link": ['/tickets/old']
    }
  ];

  constructor(
    private _user_serv : UserService,
    public router: Router ){
    //recuperation de l'url courrante
    this.router.events.subscribe((evt) => this.current_url = evt.url );

    //se connecter au modification du user courant
    this._user_serv.current_user.subscribe((user: User) => this.current_user = user);

  }

  ngOnInit() {}

}
