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
  }

  onClickBack() {
    this.location.back();
  }

  onUpdate() {
    let supplier_id = this.route.snapshot.params["supplier_id"];
    
    this.service.create(supplier_id, this.user).subscribe(
      (response) => this.router.navigate(['/suppliers/' + supplier_id]),
      (err) => console.log("UserService update: error " + err),
      () => console.log("UserService update done"));
  }

}
