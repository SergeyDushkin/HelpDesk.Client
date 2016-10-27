import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from '../client';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.css'],
  providers: [ClientService]
})
export class UserSelectComponent implements OnInit {
  
  @Output() client : string;
  @Output() onClientSelect = new EventEmitter<string>();

  clients : Client[];
  
  constructor(private clientService : ClientService) { }

  ngOnInit() {
    this.clientService.getStoreClients(null)
      .subscribe(clients => this.clients = clients);
  }

   onChange(newValue) {
     this.onClientSelect.emit(newValue);
     this.client = newValue;
   }

}
