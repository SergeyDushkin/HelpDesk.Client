import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Work } from '../work';
import { WorkService } from '../work.service';

@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html'
})
export class WorkDetailComponent implements OnInit {

  private data : Work;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: WorkService) { }

  ngOnInit() {
    this.data = this.route.snapshot.data['work'];
  }

  onClickBack() {
    this.location.back();
  }

  onDelete() {
    this.service.delete(this.data.id).toPromise()
      .then(r => 'Work was deleted')
      .then(() => this.location.back());
  }

  onUpdate() {
    this.service.update(this.data).toPromise()
      .then(r => 'Work was updated')
      .then(() => this.location.back());
  }

}
