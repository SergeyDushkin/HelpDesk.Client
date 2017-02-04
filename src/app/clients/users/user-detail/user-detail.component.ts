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

  onUpdate() {
    let client_id = this.route.snapshot.params["client_id"];
    
    this.service.update(this.user).subscribe(
      (response) => this.router.navigate(['/clients/' + client_id]),
      (err) => console.log("ClientService update: error " + err),
      () => console.log("ClientService update done"));
  }

}
