import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { ModalController } from '@ionic/angular';
import { AddTournamentPage} from './add-tournament/add-tournament.page';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
})
export class PlayerPage implements OnInit {

  constructor(private playerService : PlayerService, private modalController : ModalController) { }

  username : string;
  player : any;

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
    this.fetchPlayer();
  }

  fetchPlayer(){
    this.playerService.fetchPlayer(this.username).subscribe((data) => {
      this.player = data;
      console.log(this.player);
    })
  }

  async addTournament(){
    const modal = await this.modalController.create({
      component : AddTournamentPage
    })

    modal.onDidDismiss().then((res) => {
      if(res.data.added){
        this.fetchPlayer();
      }
    })
    return await modal.present();
  }

}
