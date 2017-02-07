import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  private users : User[];

  @Input('referenceId') referenceId : string = undefined;

  constructor(private route: ActivatedRoute, private service: UserService) { }

  ngOnInit() {
    this.users = this.route.snapshot.data['users'];

    if (!this.users) 
      this.service.get(this.referenceId).toPromise().then(r => this.users = r);

    //if (!this.users) {
    //  var referenceKey = this.route.snapshot.data["referenceKey"];
    //  var referenceId = this.route.snapshot.params[referenceKey];
    //  this.service.get(referenceId).toPromise().then(r => this.users = r);
    //}
  }

}
