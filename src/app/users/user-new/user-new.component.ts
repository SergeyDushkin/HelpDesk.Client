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
    this.user = new User();
    this.user.referenceId = this.route.parent.snapshot.params["referenceId"];
    this.user.resource = this.route.parent.snapshot.params["resource"];
  }

  onClickBack() {
    this.location.back();
  }

  onUpdate() {
    this.service.create(this.user).subscribe(
      (response) => this.router.navigate(['/' + this.user.resource + '/' + this.user.referenceId]),
      (err) => console.log("ClientService update: error " + err),
      () => console.log("ClientService update done"));
  }

}
