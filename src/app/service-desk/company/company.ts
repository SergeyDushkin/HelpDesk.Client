export class Company {
    public resource : string;
    public referenceId : string;
    public id : string;
    public name : string;

    public constructor(data:any = {}) {
        this.resource = data.resource || "ticket-service";
        this.referenceId = data.referenceId || "00000000-0000-0000-0000-000000000000";
        this.id = "00000000-0000-0000-0000-000000000000";
        this.name = data.name || "";
    }
}
