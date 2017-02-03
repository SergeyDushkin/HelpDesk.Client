import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'menu-aside',
  templateUrl: './menu-aside.component.html'
})
export class MenuAsideComponent implements OnInit {
  private current_user: User;
  private current_url: string;
  
  private links: Array<any> = [
    {
      "title": "Заявки",
      "icon": "table",
      "link": ['/tickets']
    },
    {
      "title": "Архив заявок",
      "icon": "folder",
      "link": ['/tickets/archived']
    }
  ];
  
  private adm_links: Array<any> = [
    {
      "title": "Клиенты",
      "icon": "child",
      "link": ['/clients']
    },
    {
      "title": "Операторы",
      "icon": "users",
      "link": ['/operators']
    },
    {
      "title": "Контрагенты",
      "icon": "truck ",
      "link": ['/suppliers']
    }
  ];
  
  private service_links: Array<any> = [
    {
      "title": "Заявки",
      "icon": "table",
      "link": ['/service/tickets']
    }
  ];

    private directory_links: Array<any> = [
    {
      "title": "Список договоров",
      "icon": "cube",
      "link": ['/contracts']
    },
    {
      "title": "Услуги",
      "icon": "cube",
      "link": ['/services']
    },
    {
      "title": "Статусы работ",
      "icon": "cube",
      "link": ['/work-statuses']
    },
    {
      "title": "Статусы заявок",
      "icon": "cube",
      "link": ['/ticket-statuses']
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
