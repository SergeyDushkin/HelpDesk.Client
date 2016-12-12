export class Ticket {
    id: string;
    ticketNumber: string;
    clientId: string;
    addressId: string;
    userId: string;
    description: string;
    requestDate: Date;
    completeDate?: any;
    client: Client;
    address: Address;
    user: User;

    public constructor(data:any = {}) {
        this.id = data.id || undefined;
        this.ticketNumber = data.ticketNumber || undefined;
        this.clientId = data.clientId || "";
        this.addressId = data.addressId || "";
        this.userId = data.userId || "";
        this.description = data.description || "";
        this.requestDate = data.requestDate || undefined;
        this.completeDate = data.completeDate || undefined;
        this.client = data.client ? new Client(data.client) : undefined;
        this.address = data.address || undefined;
        this.user = data.user || undefined;
    }
}

export class Client {
    id: string;
    name: string;

    public constructor(data:any = {}) {
        this.id = data.id || undefined;
        this.name = data.name || "";
    };
}

export interface Address {
    id: string;
    name: string;
}

export interface User {
    id: string;
    name: string;
}