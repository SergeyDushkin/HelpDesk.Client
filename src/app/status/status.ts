export class StatusEvent
{
    public id : string;
    public userId : string;
    public state : string;
    public message : string;
    public code : string;
    public isApproved : boolean;
    public isUndo : boolean;
    public date : Date;
    public success : boolean;
    public status : Status;

    public constructor(data:any = {}) {
        this.id = data.id || undefined;
        this.userId = data.userId || "";
        this.state = data.state || "";
        this.message = data.message || "";
        this.isApproved = data.isApproved || undefined;
        this.isUndo = data.isUndo || undefined;
        this.date = data.date || undefined;
        this.success = data.success || undefined;
        this.status = data.status || undefined;
    }

}

export class Status
{
    public id : string;
    public name : string;
    public description : string;
    public order : number;
    public step : number;
    public isFinal : boolean;

    public constructor(data:any = {}) {
        this.id = data.id || undefined;
        this.name = data.name || "";
        this.description = data.description || "";
        this.order = data.order || undefined;
        this.step = data.step || undefined;
        this.isFinal = data.isFinal || undefined;
    }
}