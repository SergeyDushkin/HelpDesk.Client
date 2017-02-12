import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit {

  private clients : Client[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.clients = this.route.snapshot.data['clients'];
  }
  
  trackById(index, item) {
    return item.id;
  }

}
