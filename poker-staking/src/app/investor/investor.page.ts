import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalController } from '@ionic/angular';
import { TournamentPage } from '../investor/modals/tournament/tournament.page';
import { PlayerService } from '../player.service';
import { InvestorService } from '../investor.service';

export interface TableData {
  id: number;
  username: string;
  platform: string;
  pName: string;
  tName: string;
  buyIn: number;
  markUp: number;
  stakeAvailable: number;

}

@Component({
  selector: 'app-investor',
  templateUrl: './investor.page.html',
  styleUrls: ['./investor.page.scss'],
})
export class InvestorPage implements OnInit {

  displayedColumns: string[] = ['platform', 'pName', 'tName', 'buyIn', 'markUp', 'stakeAvailable', 'action'];
  dataSource: MatTableDataSource<TableData>;

  // @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  // @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild(MatSort, { static: false }) set s(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  @ViewChild(MatPaginator, { static: false }) set p(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }



  constructor(private modalController: ModalController, private investorService: InvestorService, private playerService: PlayerService) { }

  segmentModel = 's2';
  walletBalance = 100000;
  username: any;
  investor: any;
  players: any;
  tournaments = [];
  flag: boolean = false;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tournaments);
    this.username = sessionStorage.getItem('username');
    this.fetchInvestor();
    this.fetchPlayers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchInvestor() {
    this.investorService.fetchInvestor(this.username).subscribe((data) => {
      this.investor = data;
      sessionStorage.setItem('investor', JSON.stringify(this.investor));
      this.flag = true;
    })
  }

  fetchPlayers() {
    this.playerService.fetchPlayers().subscribe((data) => {
      this.players = data;
      this.tournaments = [];
      for (let player of this.players) {
        for (let item of player.stakings) {
          this.tournaments.push({ pName: player.name, id: item.id, username: player.username, tName: item.tName, platform: item.platform, buyIn: item.buyIn, stakeAvailable: item.stakeAvailable, markUp: item.markUp });
        }
      }
      this.dataSource = new MatTableDataSource(this.tournaments);
      console.log(this.dataSource);
    })
  }

  async getRecord(row) {
    console.log(row);
    if (row.stakeAvailable != 0) {
      const modal = await this.modalController.create({
        component: TournamentPage,
        componentProps: {
          data: row
        }
      });

      modal.onDidDismiss().then((res) => {
        if (res.data.purchased) {
          console.log("Modal Purchased " + res.data.purchased);
          let order = {
            id: this.investor.orders.length + 1,
            pName: row.username,
            tName: row.tName,
            tId: row.id,
            platform: row.platform,
            buyIn: row.buyIn,
            stakePurchased: res.data.stakePercent,
            markUp: row.markUp,
            price: res.data.value
          }
          let body = {
            username: this.username,
            order: order
          }
          console.log(body);
          this.investorService.placeOrder(body).subscribe((res) => {
            this.fetchInvestor();
            setTimeout(() => {
              this.fetchPlayers();
            }, 1000);

          })
          // this.walletBalance = this.walletBalance - res.data.value;
          // row.stakeAvailable = row.stakeAvailable - res.data.stakePercent;
        }
      })
      return await modal.present();
    }
  }

  color(stakeAvailable){
    if(stakeAvailable >= 0 && stakeAvailable <= 10){
      return 'warn';
    // }else if(stakeAvailable > 10 && stakeAvailable <= 25){
    //   return 'accent';
    }else{
      return 'primary';
    }
  }
}
