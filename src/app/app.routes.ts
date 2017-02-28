import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';

// Components
import { LoginComponent } from './pages/login/login.component';
import { SmtpSettingsComponent} from './settings/smtp.settings.component';

import { AuthenticationGuard } from './guards/authentication-guard';

export const routes: Routes = [
    // Root
    { path: '', redirectTo: 'tickets', pathMatch: 'full'},
    { path: 'settings/smtp', component: SmtpSettingsComponent },
    { path: 'login', component: LoginComponent }

    //{ path: 'suppliers', loadChildren: './suppliers/supplier.module#SupplierModule' },
    //{ path: 'services', loadChildren: './service/service.module#ServiceModule' },
    //{ path: 'service', loadChildren: './service-desk/service-desk.module#ServiceDeskModule' },
    //{ path: 'operators', loadChildren: './service-desk/operators/operator.module#OperatorModule' }, 
    //{ path: 'work-statuses', loadChildren: './work-status/status.module#WorkStatusModule' }, 
    //{ path: 'clients', loadChildren: './clients/client.module#ClientModule' },
    //{ path: 'contracts', loadChildren: './contracts/contract.module#ContractModule' }, 
    //{ path: 'ticket-statuses', loadChildren: './service-desk/tickets/status/status.module#StatusModule' },    
    //{ path: 'ticket-priorities', loadChildren: './service-desk/tickets/priorities/priority.module#PriorityModule' },    
];

//export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}