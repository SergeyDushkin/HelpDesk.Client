export class Ticket {
    public id : string;
    public store: string;
    public comments: string;
    public startDate: Date;
    public endDate: Date;
    public number : string;
    public events : TicketEvent[];

    public constructor(data:any = {}) {
        this.id = data.id || "";
        this.store = data.store || "";
        this.comments = data.comments || "";
        this.number = data.number || "";
        this.startDate = data.startDate || Date.now();
        this.endDate = data.endDate || null;
        this.events = data.events || null;
    }
}

export class TicketEvent {
    public date : Date;
    public comments : string;
    public userName : string;
    
    public constructor(data:any = {}) {
        this.date = data.date || "";
        this.comments = data.comments || "";
        this.userName = data.userName || "";
    }
}
