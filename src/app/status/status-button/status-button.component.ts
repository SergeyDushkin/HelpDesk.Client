import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatusService } from '../status.service';
import { StatusEvent, Status } from '../status';

@Component({
  selector: 'app-status-button',
  templateUrl: './status-button.component.html'
})
export class StatusButtonComponent implements OnInit {

  @Input('referenceId') referenceId : string;
  @Input('baseUri') baseUri : string;

  private current : Status = new Status({ name: 'init', description: 'инициализация...' });
  private next : Status[];

  constructor(private route: ActivatedRoute, private statusService: StatusService) { }

  onClick(status : Status) {
    console.log('call Set Status: ' + status.name)

    this.statusService.setNext(this.referenceId, status.id).subscribe(data => console.log('Set Status done'));
  }

  onUndo() {
    console.log('call Undo Status');
  }

  ngOnInit() {
    console.log('Init StatusButtonComponent for ' + this.referenceId);

    let newStatus = new Status({ name : 'choose', description : 'Выберите действие'});

    this.statusService.init(this.referenceId, this.baseUri);
    this.statusService.getNext().subscribe(data => this.next = data);
    this.statusService.getCurrent().subscribe(
      data => this.current = (data != null) ? data.status : newStatus);
      
  }

}
