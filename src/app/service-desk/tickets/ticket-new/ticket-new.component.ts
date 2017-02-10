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
  private companyId : string = "00000000-0000-0000-0000-000000000000";


  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: TicketService) {       }

  ngOnInit() {
    this.ticket = new Ticket();
    this.ticket.startDate = new Date();
  }

  onClickBack() {
    this.location.back();
  }

  onClientChange(val) {
    this.ticket.clientId = this.ticket.client.id;
  }

  onUserChange(val) {
    //this.ticket.applicantId = val;
  }

  onOperatorChange(val) {
    //this.ticket.operatorId = val;
  }

  onAddressChange(val) {
    //this.ticket.addressId = val.id;
  }

  onContractChange(val) {
    this.ticket.contractId = this.ticket.contract.id;
  }


  onStatusChange(val) {
    this.ticket.statusId = this.ticket.status.id;
  }

   onPriorityChange(val) {
    this.ticket.priorityId = this.ticket.priority.id;
  }

  onUpdate() {
    this.service.create(this.ticket).subscribe(
      (response) => this.router.navigate(['/tickets']),
      (err) => console.log("TicketService update: error " + err),
      () => console.log("TicketService update done"));
  }

}
