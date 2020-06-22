import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  pages = [
    // {title:'',icon:'home',link:'/associate/home'},
    // {title:'L&K Team',icon:'people',link:'/associate/landkteam'},
    // {title:'HR Support',icon:'information-circle',link:'/associate/hrsupport'},
    {title:'Dashboard',icon:'folder',link:'/investor'},
    {title:'Profile',icon:'person',link:'/investor/profile'},
    {title:'My Orders',icon:'information-circle',link:'/investor/orders'},
    {title:'Leaderboard',icon:'people',link:'leaderboard'},
    {title:'Logout',icon:'exit',link:'/home'},
  ];

  activePage = this.pages[0];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page)
  {
     this.activePage=page;
  }
  checkActive(page)
  {
       return page==this.activePage;
  }

  ngOnInit() {
  }
}
