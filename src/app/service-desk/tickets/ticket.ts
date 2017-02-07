import { Client } from '../../clients/client';
import { User } from '../../clients/users/user';
import { Address } from '../../clients/address/address';
import { Status } from './status/status';

export class Ticket {
    id: string;
    ticketNumber: string;
    clientId: string;
    addressId: string;
    userId: string;
    statusId: string;
    description: string;
    startDate: Date;
    endDate?: any;
    client: Client;
    address: Address;
    user: User;
    status: Status;

    public constructor(data:any = {}) {
        this.id = data.id || undefined;
        this.ticketNumber = data.ticketNumber || undefined;
        this.clientId = data.clientId || "";
        this.addressId = data.addressId || "";
        this.userId = data.userId || "";
        this.statusId = data.statusId || undefined;
        this.description = data.description || "";
        this.startDate = data.startDate ? new Date(data.startDate) : undefined;
        this.endDate = data.endDate ? new Date(data.endDate) : undefined;
        this.client = data.client ? new Client(data.client) : undefined;
        this.address = data.address ? new Address(data.address) : new Address();
        this.user = data.user ? new User(data.user) : new User();
        this.status = data.status ? new Status(data.status) : new Status();
    }
}