import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Operator } from '../operator';
import { OperatorService } from '../operator.service';

@Component({
  selector: 'app-operator-new',
  templateUrl: './operator-new.component.html'
})
export class OperatorNewComponent implements OnInit {

  private operator : Operator;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: OperatorService) { }

  ngOnInit() {
    this.operator = new Operator();
  }

  onClickBack() {
    this.location.back();
  }

  onUpdate() {
    this.service.create(this.operator).subscribe(
      (response) => this.router.navigate(['/service/operators/'+ response.id]),
      (err) => console.log("OperatorService create: error " + err),
      () => console.log("OperatorService create done"));
  }

}
