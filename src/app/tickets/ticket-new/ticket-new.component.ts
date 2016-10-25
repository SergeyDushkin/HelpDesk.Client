import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TicketService } from '../ticket.service';


@Component({
  selector: 'app-ticket-new',
  templateUrl: './ticket-new.component.html',
  styleUrls: ['./ticket-new.component.css'],
  providers: [TicketService]
})
export class TicketNewComponent implements OnInit {

  storeId : string;
  comments: string;

  constructor(private location: Location, private ticketService : TicketService) { }

  ngOnInit() {
  }

  onClickBack() {
    this.location.back();
  }

  onSave() {
    this.ticketService.createTicket({ StoreId : this.storeId, Comments : this.comments }).subscribe(r => {
      this.location.back();
    });
  }

}
