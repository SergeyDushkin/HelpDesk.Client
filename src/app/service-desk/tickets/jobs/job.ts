export class Job {
    public id : string;
    public supplierId : string;
    public userId : string;
    public description : string;

    public constructor(data:any = {}) {
        this.id = data.id || undefined;
        this.supplierId = data.supplierId || undefined;
        this.userId = data.userId || undefined;
        this.description = data.description || "";
    }
}
