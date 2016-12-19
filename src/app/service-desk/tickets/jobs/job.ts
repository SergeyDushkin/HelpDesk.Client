export class Job {
    public id : string;
    public supplierId : string;
    public userId : string;
    public description : string;

    public jobNumber?: any;
    public startDate: Date;
    public completeDate?: any;
    public client: Client;
    public user: User;

    public constructor(data:any = {}) {
        this.id = data.id || undefined;
        this.supplierId = data.supplierId || undefined;
        this.userId = data.userId || undefined;
        this.description = data.description || "";
        this.jobNumber = data.jobNumber || "";
        this.startDate = data.startDate || undefined;
        this.completeDate = data.completeDate || undefined;
        this.client = data.client || undefined;
        this.user = data.user || undefined;
    }
}

export interface Client {
    id: string;
    name: string;
}

export interface User {
    id: string;
    name: string;
}
