import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Ticket } from '../ticket';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html'
})
export class TicketListComponent implements OnInit {

  private data : Ticket[];
  private currentPage: number = 1;
  private pager: any = {};
  private pagerService: PagerService = new PagerService();

  private isLoading : boolean;
  private isInitialized  :boolean = false;
  
  private _referenceId : string = undefined;
  private _filter : any = undefined;  
  private _count : number = 0;

  @Output() onSelect = new EventEmitter();
  @Output() countChange = new EventEmitter();

  @Input('onRefresh') onRefresh = new Subject<void>();
  
  get count() {
    return this._count;
  }

  set count(val) {
    this._count = val;
    this.countChange.emit(this._count);
  }

  constructor(private route: ActivatedRoute, private service: TicketService) { }

  ngOnInit() {
    this.refresh().then(() => this.isInitialized = true);
    this.onRefresh.subscribe(() => this.refresh());
  }
  
  trackById(index, item) {
    return item.id;
  }

  selectRow(data) {
    this.onSelect.emit(data);
  }

  setPage(page: number) {

    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.currentPage = page;
    this.refresh();
  }

  refreshPager(totalItems: number, currentPage: number = 1, pageSize: number) {
    this.pager = this.pagerService.getPager(totalItems, currentPage, pageSize)
  }

  refresh() {
    this.isLoading = true;
    return this.service.getPage(this.currentPage).toPromise()
      .then(r => {
        this.data = r.data
        this.count = r.totalCount;
        this.refreshPager(r.totalCount, this.currentPage, 100)
        this.isLoading = false;
      });
  }

}

export class PagerService {
    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(new Array(endPage + 1 - startPage),(val, index) => index + startPage); //_.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}