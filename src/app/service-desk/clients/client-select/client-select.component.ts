import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../tickets/ticket';

@Component({
  selector: 'app-client-select',
  templateUrl: './client-select.component.html'
})
export class ClientSelectComponent implements OnChanges, OnInit {

  @Output() questionChange = new EventEmitter();
  @Input('disabled') _disabled : boolean;
  @Input('client') _client : Client;
  @Input('source') _source : Client[];





  public items:Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
    'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
    'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
    'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
    'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
    'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
    'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
    'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
    'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
    'Zagreb', 'Zaragoza', 'Łódź'];

  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;

  private get disabledV():string {
    return this._disabledV;
  }

  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value:any):void {
    console.log('Selected value is: ', value);
  }

  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }

  public typed(value:any):void {
    console.log('New search input: ', value);
  }

  public refreshValue(value:any):void {
    this.value = value;
  }







  get data() {

    if (!this._source) {
      return new Array<Client>(this._client);
    }

    return this._source;
  }
/*
  get disabled() {

    if (!this._disabled) {
      return false;
    }

    return this._disabled;
  }*/

  get client() {
    return this._client;
  }

  set client(val) {
    this._client = val;
    this.questionChange.emit(this._client);
  }

  onChange(value){
    this.client = value;
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

}
