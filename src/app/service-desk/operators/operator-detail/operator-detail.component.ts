import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Operator } from '../operator';
import { OperatorService } from '../operator.service';

@Component({
  selector: 'app-operator-detail',
  templateUrl: './operator-detail.component.html'
})
export class OperatorDetailComponent implements OnInit {

  private operator : Operator;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: OperatorService) { }

  ngOnInit() {
    this.operator = this.route.snapshot.data['operator'];
  }

  onClickBack() {
    this.location.back();
  }

  onUpdate() {
    this.service.update(this.operator).subscribe(
      (response) => this.router.navigate(['/service/operators']),
      (err) => console.log("OperatorService update: error " + err),
      () => console.log("OperatorService update done"));
  }

}
