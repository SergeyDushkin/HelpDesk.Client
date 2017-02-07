import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Work } from '../work';
import { WorkService } from '../work.service';

@Component({
  selector: 'app-work-new',
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
      (response) => this.router.navigate(['/works']),
      (err) => console.log("WorkService create: error " + err),
      () => console.log("WorkService create done"));
  }

}
