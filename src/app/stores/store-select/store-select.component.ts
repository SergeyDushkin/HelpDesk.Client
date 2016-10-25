import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from '../store.service';
import { Store } from '../store';

@Component({
  selector: 'app-store-select',
  templateUrl: './store-select.component.html',
  styleUrls: ['./store-select.component.css'],
  providers: [StoreService]
})
export class StoreSelectComponent implements OnInit {
  
  @Input() store : string;

  stores : Store[];
  
  constructor(private storeService : StoreService) { }

  ngOnInit() {
    this.storeService.getStores()
      .subscribe(stores => this.stores = stores);
  }

   onChange(newValue) {
    this.store = newValue;
   }

}
