import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { StoreService } from '../store.service';
import { Store } from '../store';

@Component({
  selector: 'app-store-select',
  templateUrl: './store-select.component.html',
  styleUrls: ['./store-select.component.css'],
  providers: [StoreService]
})
export class StoreSelectComponent implements OnInit {
  
  @Output() store : string;
  @Output() onStoreSelect = new EventEmitter<string>();

  stores : Store[];
  
  constructor(private storeService : StoreService) { }

  ngOnInit() {
    this.storeService.getStores()
      .subscribe(stores => this.stores = stores);
  }

   onChange(newValue) {
     this.onStoreSelect.emit(newValue);
     this.store = newValue;
   }

}
