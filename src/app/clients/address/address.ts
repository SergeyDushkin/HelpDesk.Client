export class Address {
    public id : string;
    public name : string;
    public address : string;

    public constructor(data:any = {}) {
        this.id = data.id || "";
        this.name = data.name || "";
        this.address = data.contact ?  data.contact.address : "";
    }
}
