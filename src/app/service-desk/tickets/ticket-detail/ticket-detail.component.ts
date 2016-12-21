import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../ticket';
import { BaseApiService } from '../../../services/base-api.service';
import { TicketService } from '../ticket.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html'
})
export class TicketDetailComponent implements OnInit {

  public uploader:FileUploader;
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  private disabled: boolean = true;
  private ticket : Ticket;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private apiService : BaseApiService, private service: TicketService) { }

  ngOnInit() {
    this.ticket = this.route.snapshot.data['ticket'];
    this.uploader = new FileUploader({url: this.apiService.getBaseUrl() + "tickets/" + this.ticket.id + "/files/", headers: null });
  }

  onUpdate() {
    this.service.update(this.ticket).subscribe(
      (response) => this.router.navigate(['/service/tickets/']),
      (err) => console.log("TicketService update: error " + err),
      () => console.log("TicketService update done"));
  }

}
