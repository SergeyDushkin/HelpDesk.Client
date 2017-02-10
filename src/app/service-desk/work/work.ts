import { Client } from '../clients/client';
import { User } from '../users/user';
import { Status } from '../work-status/status';

export class Work {
    public resource : string;
    public referenceId : string;
    public id : string;
    public supplier : Client;
    public worker : User;
    public status : Status;
    public supplierId : string;
    public workerId : string;
    public statusId : string;
    public startDate : Date;
    public endDate : Date;
    public description : string;

    public constructor(data:any = {}) {
        this.resource = data.resource || "ticket-service";
        this.referenceId = data.referenceId || "00000000-0000-0000-0000-000000000000";
        this.id = data.id || undefined;
        this.supplierId = data.supplierId || undefined;
        this.workerId = data.workerId || undefined;
        this.statusId = data.statusId || undefined;
        this.startDate = data.startDate ? new Date(data.startDate) : new Date();
        this.endDate = data.endDate ? new Date(data.endDate) : undefined;
        this.description = data.description || "";
        this.supplier = data.supplier || new Client();
        this.worker = data.worker || new User();
        this.status = data.status || new Status();
    }
}

export class CreateWork {
    public resource : string;
    public referenceId : string;
    public id : string;
    public supplier : Client;
    public worker : User;
    public status : Status;
    public supplierId : string;
    public workerId : string;
    public statusId : string;
    public startDate : Date;
    public endDate : Date;
    public description : string;

    public constructor(data:any = {}) {
        this.resource = data.resource || "ticket-service";
        this.referenceId = data.referenceId || "00000000-0000-0000-0000-000000000000";
        this.supplierId = data.supplierId || undefined;
        this.workerId = data.workerId || undefined;
        this.statusId = data.statusId || undefined;
        this.startDate = data.startDate ? new Date(data.startDate) :undefined;
        this.endDate = data.endDate ? new Date(data.endDate) : undefined;
        this.description = data.description || "";
    }
}
