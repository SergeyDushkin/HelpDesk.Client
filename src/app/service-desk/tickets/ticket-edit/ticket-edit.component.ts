import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../ticket';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html'
})
export class TicketEitComponent implements OnInit {

  private disabled: boolean = true;
  private ticket : Ticket;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private service: TicketService) { }

  ngOnInit() {
    this.ticket = this.route.snapshot.data['ticket'];
  }

    onClickBack() {
    //this.location.back();
    this.router.navigate(['/tickets']);
  }

  onUpdate() {
    this.service.update(this.ticket).subscribe(
      (response) => this.router.navigate(['/tickets']),
      (err) => console.log("TicketService update: error " + err),
      () => console.log("TicketService update done"));
  }

}
