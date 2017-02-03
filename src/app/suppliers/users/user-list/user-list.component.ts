import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  private users : User[];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.users = this.route.snapshot.data['users'];
  }

   onClickBack() {
    //this.location.back();
    this.router.navigate(['/suppliers']);
  }
  

}
