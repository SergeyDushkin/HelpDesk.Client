import { Client } from '../clients/client';

export class Contract {
    public resource : string;
    public referenceId : string;
    public id : string;
    public name : string;
    public number : string;
    public date : Date;
    public startDate : Date;
    public endDate  : Date;
    public client  : Client;
    public clientId  : string;

    public constructor(data:any = {}) {
        this.resource = data.resource || "ticket-service";
        this.referenceId = data.referenceId || "00000000-0000-0000-0000-000000000000";
        this.id = data.id || undefined;
        this.name = data.name || "";
        this.number = data.number || "";
        this.date = new Date(data.date) || undefined;
        this.startDate = new Date(data.startDate) || undefined;
        this.endDate = new Date(data.endDate) || undefined;
        this.client = data.client || new Client();
        this.clientId = data.clientId || undefined;
    }

    public getName = () => this.number + ' от ' + this.date.toDateString()
}
