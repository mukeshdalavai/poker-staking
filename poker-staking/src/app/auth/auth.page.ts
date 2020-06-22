import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { AuthService} from '../auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private modalController : ModalController, private service : AuthService, private navController : NavController) { }
  username : string;
  password : string;

  ngOnInit() {
  }

  login(){
    console.log(this.username + " " + this.password);
    this.service.fetchUser({username : this.username, password : this.password}).subscribe((res, ) => {
      if(res.status == 200){
        sessionStorage.setItem('username',this.username);
        this.navController.navigateForward(res.body.role);
        this.modalController.dismiss();
      }
      console.log(res);
    })
  }

  dismiss(){
    this.modalController.dismiss();
  }
}
