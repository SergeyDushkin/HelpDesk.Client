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
    this.service.delete(this.data.id).subscribe(
      (response) => this.router.navigate(['/work-workes']),
      (err) => console.log("WorkWorkService delete: error " + err),
      () => console.log("WorkWorkService delete done"));
  }

  onUpdate() {
    this.service.update(this.data).subscribe(
      (response) => this.router.navigate(['/work-workes']),
      (err) => console.log("WorkWorkService update: error " + err),
      () => console.log("WorkWorkService update done"));
  }

}
