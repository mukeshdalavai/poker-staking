import { Component, OnInit, Input } from '@angular/core';
import { ModalController} from '@ionic/angular';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.page.html',
  styleUrls: ['./tournament.page.scss'],
})
export class TournamentPage implements OnInit {

  @Input() data: any;
  autoTicks = true;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  value = 0;
  tickInterval = 5;
  stake = this.value;
  markUp = 0;
  gatewayCharges = 0;
  total = 0;


  constructor(private modalController:ModalController) { }

  ngOnInit() {
    this.max=this.data.stakeAvailable;
  }

  onClose(){
    this.modalController.dismiss();
  }

  onPurchase(){
    console.log(this.total);
    this.modalController.dismiss({purchased : true, value : this.total, stakePercent : this.value});
  }

  calculate(){
    this.stake = (this.data.buyIn * this.value) / 100;
    this.markUp = this.stake * this.data.markUp;
    this.gatewayCharges = ((this.stake + this.markUp) * 2) / 100;
    this.total = this.stake + this.markUp + this.gatewayCharges;
  }

}
