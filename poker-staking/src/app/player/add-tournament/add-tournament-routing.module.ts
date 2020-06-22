import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTournamentPage } from './add-tournament.page';

const routes: Routes = [
  {
    path: '',
    component: AddTournamentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTournamentPageRoutingModule {}
