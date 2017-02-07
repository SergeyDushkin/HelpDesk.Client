import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  private users : User[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.users = this.route.snapshot.data['users'];
  }

}
