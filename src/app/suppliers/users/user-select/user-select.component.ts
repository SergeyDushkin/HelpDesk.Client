import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-supplier-user-select',
  templateUrl: './user-select.component.html'
})
export class UserSelectComponent implements OnChanges, OnInit {

  private _supplier : string;

  @Output() userChange = new EventEmitter();
  @Input('disabled') _disabled : boolean = false;
  @Input('user') _user : User;
  @Input('source') _source : User[];

  get data() {
    return this._source;
  }

  get disabled() : boolean {
    return this._disabled;
  }

  @Input('supplier')
  set supplier(val) {
    
    if (!val) {
      this._source = new Array<User>();
      return;
    }

    this._supplier = val;
    this.userService.get(val).toPromise()
      .then(r => this._source = r)
      .then(r => r[0])
      .then(r => this.user = r);
  }

  get user() {
    return this._user;
  }

  set user(val) {
    this._user = val;
    this.userChange.emit(this._user);
  }

  onChange(value){
  }

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
  }

}
