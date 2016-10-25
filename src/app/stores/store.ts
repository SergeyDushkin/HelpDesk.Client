export class Store {
    public id : string;
    public name: string;
    public address: string;
    
    public constructor(data:any = {}) {
        this.id = data.id || "";
        this.name = data.name || "";
        this.address = data.address || "";
    }

    public getName() {
        if (!this.name)
            return this.address;

        if (!this.address) {
            return this.name;
        }

        return this.name + " (" + this.address + ")";
    }
}
