import { User } from '../../clients/users/user';
import { Address } from '../../clients/address/address';

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
        this.address = data.address || new Address();
        this.user = data.user || new User;
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

/*
export class Address {
    id: string;
    name: string;
}

export class User {
    id: string;
    name: string;
}*/