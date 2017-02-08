export class Service {
    public resource : string;
    public referenceId : string;
    public id : string;
    public name : string;
    public service : string;

    public constructor(data:any = {}) {
        this.resource = data.resource || "ticket-service";
        this.referenceId = data.referenceId || "00000000-0000-0000-0000-000000000000";
        this.id = data.id || "";
        this.name = data.name || "";
        this.service = data.service || "";
    }
}
