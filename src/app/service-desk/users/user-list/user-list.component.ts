import { Component, OnInit, Output, OnChanges, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnChanges, OnInit {

  private users : User[];

  @Output() countChange = new EventEmitter();
  @Input('count') _count : number = 0;
  @Input('referenceId') referenceId : string = undefined;
  
  get count() {
    return this._count;
  }

  set count(val) {
    this._count = val;
    this.countChange.emit(this._count);
  }

  constructor(private route: ActivatedRoute, private service: UserService) { }

  ngOnInit() {
    this.users = this.route.snapshot.data['users'];

    if (this.users)
      this.count = this.users.length;

    if (!this.users) 
      this.service.get(this.referenceId).toPromise().then(r => this.users = r).then(r => this.count = r.length);
  }

  ngOnChanges(changes) {
  }
  
  trackById(index, item) {
    return item.id;
  }

}
