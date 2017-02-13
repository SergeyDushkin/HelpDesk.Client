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

  onSupplierChange(val) {
    this.data.supplierId = this.data.supplier.id;
  }

  onStatusChange(val) {
    this.data.statusId = val;
  }

  set workStartDate(e: any) {
    e = e.replace('T','-');
    e = e.split('-');
    var timeParts = e[3].split(':');

    let d = new Date(Date.UTC(e[0], e[1]-1, e[2], timeParts[0], timeParts[1]));
    this.data.startDate = d;
  }

  get workStartDate() {
    let date = this.data.startDate;
    return (date.getUTCFullYear().toString() + '-' 
           + ("0" + (date.getUTCMonth() + 1)).slice(-2) + '-' 
           + ("0" + (date.getUTCDate())).slice(-2))
           + 'T' 
           + ("0" + (date.getUTCHours())).slice(-2) + ':' 
           + ("0" + (date.getUTCMinutes())).slice(-2);
  }

  set workEndDate(e: any) {
    e = e.replace('T','-');
    e = e.split('-');
    var timeParts = e[3].split(':');

    let d = new Date(Date.UTC(e[0], e[1]-1, e[2], timeParts[0], timeParts[1]));
    this.data.endDate = d;
  }

  get workEndDate() {
    let date = this.data.endDate;
    return (date.getUTCFullYear().toString() + '-' 
           + ("0" + (date.getUTCMonth() + 1)).slice(-2) + '-' 
           + ("0" + (date.getUTCDate())).slice(-2))
           + 'T' 
           + ("0" + (date.getUTCHours())).slice(-2) + ':' 
           + ("0" + (date.getUTCMinutes())).slice(-2);
  }

}
