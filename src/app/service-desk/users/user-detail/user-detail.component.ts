import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {

  private user : User;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: UserService) { }

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
  }

  onClickBack() {
    this.location.back();
  }

  onDelete() {
    this.service.delete(this.user.id).toPromise()
      .then(r => 'User was deleted')
      .then(() => this.location.back());
  }

  onUpdate() {
    this.service.update(this.user).toPromise()
      .then(r => 'User was updated')
      .then(() => this.location.back());
  }

}
