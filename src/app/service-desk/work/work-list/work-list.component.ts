import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Work } from '../work';
import { WorkService } from '../work.service';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html'
})
export class WorkListComponent implements OnInit {

  @Input('referenceId') referenceId : string = undefined;
  private data : Work[];

  constructor(private route: ActivatedRoute, private service: WorkService) { }

  ngOnInit() {
    this.data = this.route.snapshot.data['work'];

    if (!this.data) 
      this.service.get(this.referenceId).toPromise().then(r => this.data = r);
  }

}
