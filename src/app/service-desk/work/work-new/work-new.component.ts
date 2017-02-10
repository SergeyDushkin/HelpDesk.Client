import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Work, CreateWork } from '../work';
import { WorkService } from '../work.service';

@Component({
  selector: 'app-work-new',
  templateUrl: './work-new.component.html'
})
export class WorkNewComponent implements OnInit {

  private data : Work;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: WorkService) { }

  ngOnInit() {
    this.data = new Work({
      referenceId: this.route.snapshot.params["referenceId"],
      resource: this.route.snapshot.params["resource"]
    });
  }

  onClickBack() {
    this.location.back();
  }

  onStatusChange(val) {
    this.data.statusId = this.data.status.id;
  }

  onUpdate() {
    var create = new CreateWork(this.data);

    this.service.create(create).subscribe(
      (response) => this.router.navigate(['/works']),
      (err) => console.log("WorkService create: error " + err),
      () => console.log("WorkService create done"));
  }

}
