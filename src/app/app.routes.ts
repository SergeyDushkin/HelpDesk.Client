import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';

// Components
import { LoginComponent } from './pages/login/login.component';
import { SmtpSettingsComponent} from './settings/smtp.settings.component';

import { AuthenticationGuard } from './guards/authentication-guard';

export const routes: Routes = [
    // Root
    { path: '', redirectTo: 'service/tickets', pathMatch: 'full', canActivate: [AuthenticationGuard] },
    
    { path: 'settings/smtp', component: SmtpSettingsComponent, canActivate: [AuthenticationGuard] },
    { path: 'clients', loadChildren: './clients/client.module#ClientModule' },

    { path: 'suppliers', loadChildren: './suppliers/supplier.module#SupplierModule' },
    { path: 'services', loadChildren: './service/service.module#ServiceModule' },
    { path: 'service', loadChildren: './service-desk/service-desk.module#ServiceDeskModule' },
    { path: 'operators', loadChildren: './service-desk/operators/operator.module#OperatorModule' }, 
    { path: 'work-statuses', loadChildren: './work-status/status.module#WorkStatusModule' }, 
    //{ path: 'contracts', loadChildren: './contracts/contract.module#ContractModule' }, 
    { path: 'ticket-statuses', loadChildren: './service-desk/tickets/status/status.module#StatusModule' },    
    { path: 'ticket-priorities', loadChildren: './service-desk/tickets/priorities/priority.module#PriorityModule' },    

    { path: 'login', component: LoginComponent },
];

//export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}