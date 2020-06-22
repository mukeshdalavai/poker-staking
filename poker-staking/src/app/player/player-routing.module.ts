import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerPage } from './player.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerPage
  },
  {
    path: 'add-tournament',
    loadChildren: () => import('./add-tournament/add-tournament.module').then( m => m.AddTournamentPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerPageRoutingModule {}
