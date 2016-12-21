import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../ticket';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-file-new',
  templateUrl: './file-new.component.html'
})
export class TicketFileNewComponent implements OnInit {

  private ticket : Ticket;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit() {
  }

  onUpdate() {
  }

  onClickBack() {
    this.location.back();
  }

}
