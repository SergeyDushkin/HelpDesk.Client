export class Client {
    public id : string;
    public name : string;

    public constructor(data:any = {}) {
        this.id = data.id || "";
        this.name = data.name || "";
    }
}
