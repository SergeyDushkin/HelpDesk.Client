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
    let supplier_id = this.route.snapshot.params["supplier_id"];
    
    this.service.update(supplier_id, this.user).subscribe(
      (response) => this.router.navigate(['/suppliers/' + supplier_id]),
      (err) => console.log("UserService update: error " + err),
      () => console.log("UserService update done"));
  }

}
