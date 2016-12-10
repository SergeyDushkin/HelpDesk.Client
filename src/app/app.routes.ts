import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './pages/login/login.component';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { TicketArchListComponent } from './tickets/ticket-arch-list/ticket-arch-list.component';
import { TicketDetailComponent } from './tickets/ticket-detail/ticket-detail.component';
import { TicketNewComponent } from './tickets/ticket-new/ticket-new.component';

import { AuthenticationGuard } from './guards/authentication-guard';
import { TicketListResolve } from './tickets/ticket-list/ticket-list-resolve.service';
import { TicketDetailResolve } from './tickets/ticket-detail/ticket-detail-resolve.service';

import { ClientListComponent } from './clients/client-list/client-list.component';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { ClientNewComponent } from './clients/client-new/client-new.component';
import { ClientListResolve } from './clients/client-list-resolve.service';
import { ClientDetailResolve } from './clients/client-detail-resolve.service';

import { UserListComponent } from './clients/users/user-list/user-list.component';
import { UserDetailComponent } from './clients/users/user-detail/user-detail.component';
import { UserNewComponent } from './clients/users/user-new/user-new.component';
import { UserListResolve } from './clients/users/user-list-resolve.service';
import { UserDetailResolve } from './clients/users/user-detail-resolve.service';

import { AddressListComponent } from './clients/address/address-list/address-list.component';
import { AddressDetailComponent } from './clients/address/address-detail/address-detail.component';
import { AddressNewComponent } from './clients/address/address-new/address-new.component';
import { AddressListResolve } from './clients/address/address-list-resolve.service';
import { AddressDetailResolve } from './clients/address/address-detail-resolve.service';

const routes: Routes = [
    // Root
    { path: '', component: TicketListComponent, canActivate: [AuthenticationGuard] },
    
    { path: 'tickets', component: TicketListComponent, resolve: { tickets: TicketListResolve } , canActivate: [AuthenticationGuard] },
    { path: 'tickets/archived', component: TicketArchListComponent, canActivate: [AuthenticationGuard] },
    { path: 'tickets/new', component: TicketNewComponent, data : { title : 'Создание заявки' }, canActivate: [AuthenticationGuard]},
    { path: 'tickets/:id', component: TicketDetailComponent, canActivate: [AuthenticationGuard], resolve: { ticket: TicketDetailResolve } },

    { path: 'clients', component: ClientListComponent, canActivate: [AuthenticationGuard], resolve: { clients: ClientListResolve } },
    { path: 'clients/create', component: ClientNewComponent, canActivate: [AuthenticationGuard] },
    { path: 'clients/:client_id', component: ClientDetailComponent, canActivate: [AuthenticationGuard], resolve: { client: ClientDetailResolve, users: UserListResolve, address: AddressListResolve } },
    
    { path: 'clients/:client_id/users/', component: UserListComponent, canActivate: [AuthenticationGuard], resolve: { users: UserListResolve } },
    { path: 'clients/:client_id/users/create', component: UserNewComponent, canActivate: [AuthenticationGuard] },
    { path: 'clients/:client_id/users/:id', component: UserDetailComponent, canActivate: [AuthenticationGuard], resolve: { user: UserDetailResolve } },

    { path: 'clients/:client_id/address/', component: AddressListComponent, canActivate: [AuthenticationGuard], resolve: { address: AddressListResolve } },
    { path: 'clients/:client_id/address/create', component: AddressNewComponent, canActivate: [AuthenticationGuard] },
    { path: 'clients/:client_id/address/:id', component: AddressDetailComponent, canActivate: [AuthenticationGuard], resolve: { address: AddressDetailResolve } },

    { path: 'login', component: LoginComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
