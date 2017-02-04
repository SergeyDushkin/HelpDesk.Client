import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Unit } from '../unit';
import { UnitService } from '../unit.service';

@Component({
  selector: 'app-unit-new',
  templateUrl: './unit-new.component.html'
})
export class UnitNewComponent implements OnInit {

  private unit : Unit;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: UnitService) { }

  ngOnInit() {
    this.unit = new Unit();
    this.unit.referenceId = this.route.snapshot.params["client_id"];
  }

  onClickBack() {
    this.location.back();
  }

  onUpdate() {
    this.service.create(this.unit).subscribe(
      (response) => this.router.navigate(['/clients/' + this.unit.referenceId]),
      (err) => console.log("UnitService update: error " + err),
      () => console.log("UnitService update done"));
  }

}