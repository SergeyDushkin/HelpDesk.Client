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

  store : string;
  storeId : string;
  comments: string;

  constructor(private location: Location, private ticketService : TicketService) { }

  ngOnInit() {
  }

  onClickBack() {
    this.location.back();
  }

  onSelect(value : string){
    this.store = value;
  }

  onSave() {
    this.ticketService.createTicket({ StoreId : this.store, Comments : this.comments }).subscribe(r => {
      this.location.back();
    });
  }

}
