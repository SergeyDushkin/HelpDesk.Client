import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './pages/login/login.component';

import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { TicketArchListComponent } from './tickets/ticket-arch-list/ticket-arch-list.component';
import { TicketDetailComponent } from './tickets/ticket-detail/ticket-detail.component';
import { TicketNewComponent } from './tickets/ticket-new/ticket-new.component';
import { SmtpSettingsComponent} from './settings/smtp.settings.component';

import { AuthenticationGuard } from './guards/authentication-guard';
import { TicketListResolve } from './tickets/ticket-list/ticket-list-resolve.service';
import { TicketDetailResolve } from './tickets/ticket-detail/ticket-detail-resolve.service';

export const routes: Routes = [
    // Root
     { path: '', component: TicketListComponent, canActivate: [AuthenticationGuard] },
    

    { path: 'tickets', component: TicketListComponent, resolve: { tickets: TicketListResolve } , canActivate: [AuthenticationGuard] },
    { path: 'tickets/archived', component: TicketArchListComponent, canActivate: [AuthenticationGuard] },
    { path: 'tickets/new', component: TicketNewComponent, data : { title : 'Создание заявки' }, canActivate: [AuthenticationGuard]},
    { path: 'tickets/:id', component: TicketDetailComponent, canActivate: [AuthenticationGuard], resolve: { ticket: TicketDetailResolve } },
    { path: 'settings/smtp', component: SmtpSettingsComponent, canActivate: [AuthenticationGuard] },


    { path: 'clients', loadChildren: './clients/client.module#ClientModule' },
    { path: 'suppliers', loadChildren: './suppliers/supplier.module#SupplierModule' },
    { path: 'services', loadChildren: './service/service.module#ServiceModule' },
    { path: 'service', loadChildren: './service-desk/service-desk.module#ServiceDeskModule' },
    { path: 'operators', loadChildren: './service-desk/operators/operator.module#OperatorModule' }, 
    { path: 'work-statuses', loadChildren: './works/status/status.module#StatusModule' }, 
    
    { path: 'login', component: LoginComponent },
];

//export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}