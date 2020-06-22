import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestorPage } from './investor.page';

const routes: Routes = [
  {
    path: '',
    component: InvestorPage
  },
  {
    path: 'tournament',
    loadChildren: () => import('./modals/tournament/tournament.module').then( m => m.TournamentPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestorPageRoutingModule {}
