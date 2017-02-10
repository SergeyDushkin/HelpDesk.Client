export class User {
    public resource : string;
    public referenceId : string;
    public id : string;
    public firstName : string;
    public middleName : string;
    public lastName : string;
    public genderCode : string;
    public dateOfBirth : Date;

    public constructor(data:any = {}) {
        this.resource = data.resource || "ticket-service";
        this.referenceId = data.referenceId || "00000000-0000-0000-0000-000000000000";
        this.id = data.id || undefined;
        this.firstName = data.firstName || "";
        this.middleName = data.middleName || "";
        this.lastName = data.lastName || "";
        this.genderCode = data.genderCode || "";
        this.dateOfBirth = data.dateOfBirth ? new Date(data.dateOfBirth) : new Date();
    }

    public getName = () => `${this.lastName} ${this.firstName} ${this.middleName}`;
}
