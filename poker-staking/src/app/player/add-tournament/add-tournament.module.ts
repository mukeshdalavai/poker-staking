import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTournamentPageRoutingModule } from './add-tournament-routing.module';

import { AddTournamentPage } from './add-tournament.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddTournamentPageRoutingModule
  ],
  declarations: [AddTournamentPage]
})
export class AddTournamentPageModule {}
