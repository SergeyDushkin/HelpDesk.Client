import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Operator } from '../operator';

@Component({
  selector: 'app-operator-list',
  templateUrl: './operator-list.component.html'
})
export class OperatorListComponent implements OnInit {

  private operators : Operator[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.operators = this.route.snapshot.data['operators'];
  }

}
