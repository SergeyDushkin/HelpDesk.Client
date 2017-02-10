import { Client } from '../clients/client';
import { User } from '../users/user';
import { Address } from '../address/address';
import { Status } from '../ticket-status/status';
import { Contract } from '../contracts/contract';
import { Priority } from '../ticket-priority/priority';
import { Service } from '../service/service';
import { Unit } from '../units/unit';

export class Ticket {
    id: string;
    ticketNumber: string;
    description: string;
    startDate: Date;
    endDate?: any;    
    createdAt: Date;
    clientId: string;
    addressId: string;
    contractId: string;
    priorityId: string;
    statusId: string; 
    serviceId: string; 
    operatorId: string; 
    businessUnitId: string;
    userId: string;
    applicantId : string;
    
    client: Client;
    address: Address;
    contract: Contract;
    priority: Priority;
    status: Status;
    service: Service;
    user: User;
    applicant : User;
    operator : User;
    businessunit: Unit;

    public constructor(data:any = {}) {
        this.id = data.id || undefined;
        this.ticketNumber = data.ticketNumber || undefined;
        this.description = data.description || "";
        this.startDate = data.startDate ? new Date(data.startDate) : undefined;
        this.endDate = data.endDate ? new Date(data.endDate) : undefined;   
        this.createdAt = data.createdAt ? new Date(data.createdAt) : undefined;
        this.clientId = data.clientId || "";
        this.addressId = data.addressId || "";
        this.contractId = data.contractId || undefined;
        this.priorityId = data.priorityId || undefined;
        this.statusId = data.statusId || undefined;
        this.serviceId = data.serviceId || undefined;
        this.operatorId = data.operatorId || undefined;
        this.businessUnitId = data.businessUnitId || undefined;
        this.userId = data.userId || "";
        this.applicantId = data.applicantId || undefined;
        
        this.client = data.client ? new Client(data.client) : new Client();
        this.address = data.address ? new Address(data.address) : new Address();
        this.contract = data.contract ? new Contract(data.contract) : new Contract();
        this.priority = data.priority ? new Priority(data.priority) : new Priority();
        this.status = data.status ? new Status(data.status) : new Status();
        this.service = data.service ? new Service(data.service) : new Service();
        this.user = data.user ? new User(data.user) : new User();
        this.operator = data.operator ? new User(data.operator) : new User();
        this.applicant = data.applicant ? new User(data.applicant) : new User();
        this.businessunit = data.businessunit ? new Unit(data.businessunit) : new Unit();
    }
}