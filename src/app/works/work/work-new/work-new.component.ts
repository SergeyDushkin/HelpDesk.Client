import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Work } from '../work';
import { WorkService } from '../work.service';

@Component({
  selector: 'app-work-work-new',
  templateUrl: './work-new.component.html'
})
export class WorkNewComponent implements OnInit {

  private data : Work;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: WorkService) { }

  ngOnInit() {
    this.data = new Work();
  }

  onClickBack() {
    this.location.back();
  }

  onUpdate() {
    this.service.create(this.data).subscribe(
      (response) => this.router.navigate(['/work-workes']),
      (err) => console.log("WorkWorkService create: error " + err),
      () => console.log("WorkWorkService create done"));
  }

}
