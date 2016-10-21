import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './pages/home/home.component';
import { PageNumComponent } from './pages/page-num/page-num.component';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';

const routes: Routes = [
    // Root
    { path: '', component: HomeComponent},
    { path: 'page/:id', component: PageNumComponent},
    { path: 'tickets', component: TicketListComponent},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
