import { Component, Input } from '@angular/core';

@Component({
  selector: 'tab-badge',
  templateUrl: 'index.html',
  styleUrls:  ['styles.css']
})
export class TabBadgeComponent {

  @Input('value') public value: number;
  
  constructor(){}
}
