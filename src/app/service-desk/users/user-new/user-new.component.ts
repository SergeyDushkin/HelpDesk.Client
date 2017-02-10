import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html'
})
export class UserNewComponent implements OnInit {

  private user : User;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: UserService) { }

  ngOnInit() {
    this.user = new User({
      referenceId: this.route.snapshot.params["referenceId"],
      resource: this.route.snapshot.params["resource"]
    });
  }

  onClickBack() {
    this.location.back();
  }

  onUpdate() {
    this.service.create(this.user).toPromise()
      .then(r => 'User was created')
      .then(() => this.location.back());
  }

}
