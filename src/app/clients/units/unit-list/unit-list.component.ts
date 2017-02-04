import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Unit } from '../unit';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html'
})
export class UnitListComponent implements OnInit {

  private unit : Unit[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.unit = this.route.snapshot.data['unit'];
  }

}
