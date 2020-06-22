import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  constructor() { }

  investor : any;

  ngOnInit() {
    this.investor = JSON.parse(sessionStorage.getItem('investor'));
    console.log(this.investor)
  }

}
