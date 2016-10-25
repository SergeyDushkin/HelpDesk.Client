export class Ticket {
    public id : string;
    public store: string;
    public comments: string;
    public startDate: Date;
    public endDate: Date;
    public ticketNumber : string;
    
    public constructor(data:any = {}) {
        this.id = data.id || "";
        this.store = data.store || "";
        this.comments = data.comments || "";
        this.ticketNumber = data.ticketNumber || "";
        this.startDate = data.startDate || Date.now();
        this.endDate = data.endDate || Date.now();
    }
}
