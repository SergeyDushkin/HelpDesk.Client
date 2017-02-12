import { Component, OnInit, Output, OnChanges, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contract } from '../contract';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html'
})
export class ContractListComponent implements OnInit {

  @Output() countChange = new EventEmitter();
  @Input('count') _count : number = 0;
  @Input('referenceId') referenceId : string = undefined;
  
  get count() {
    return this._count;
  }

  set count(val) {
    this._count = val;
    this.countChange.emit(this._count);
  }

  private data : Contract[];

  constructor(private route: ActivatedRoute, private service: ContractService) { }

  ngOnInit() {
    this.data = this.route.snapshot.data['contract'];

    if (this.data)
      this.count = this.data.length;

    if (!this.data) 
      this.service.get(this.referenceId).toPromise().then(r => this.data = r).then(r => this.count = r.length);
  }
  
  trackById(index, item) {
    return item.id;
  }

}
