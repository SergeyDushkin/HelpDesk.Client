import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../ticket';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-new',
  templateUrl: './ticket-new.component.html'
})
export class TicketNewComponent implements OnInit {

  private ticket : Ticket;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: TicketService) { }

  ngOnInit() {
    this.ticket = new Ticket();
  }

  onClickBack() {
    this.location.back();
  }

  onClientChange(val) {
    //this.ticket.clientId = val;
  }

  onUserChange(val) {
    //this.ticket.userId = val.id;
  }

  onAddressChange(val) {
    //this.ticket.addressId = val.id;
  }

  onStatusChange(val) {
    this.ticket.statusId = val;
  }

   onPriorityChange(val) {
    this.ticket.priorityId = val;
  }


  onUpdate() {
    this.service.create(this.ticket).subscribe(
      (response) => this.router.navigate(['/tickets']),
      (err) => console.log("TicketService update: error " + err),
      () => console.log("TicketService update done"));
  }

}
