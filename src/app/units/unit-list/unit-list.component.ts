import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Unit } from '../unit';
import { UnitService } from '../unit.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html'
})
export class UnitListComponent implements OnInit {

  private unit : Unit[];

  @Input('referenceId') referenceId : string = undefined;

  constructor(private route: ActivatedRoute, private service: UnitService) { }

  ngOnInit() {
    this.unit = this.route.snapshot.data['unit'];

    if (!this.unit) 
      this.service.get(this.referenceId).toPromise().then(r => this.unit = r);
  }

}
