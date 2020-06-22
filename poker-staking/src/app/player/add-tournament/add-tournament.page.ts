import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PlayerService } from 'src/app/player.service';

@Component({
  selector: 'app-add-tournament',
  templateUrl: './add-tournament.page.html',
  styleUrls: ['./add-tournament.page.scss'],
})
export class AddTournamentPage implements OnInit {

  constructor(private formBuilder: FormBuilder, private modalController : ModalController, private playerService : PlayerService) { }

  formInputFields:FormGroup;

  public errorMessages = {
    platform: [
      { type: 'required', message: 'platform is required' },
      { type: 'pattern', message: ' please enter a valid platform' }
    ],
  tName:[
    { type: 'required', message: 'name of the tournament is required' },
    { type: 'minlength', message: ' please enter a valid name having more than 4 characters' },
    {type:'pattern',message:'please enter a valid name'}
  ],
  buyIn: [
    { type: 'required', message: 'please enter the value' },
    { type: 'pattern', message: 'Character found...'},
    { type: 'maxlength', message: 'Length exceeded'},
    { type: 'minlength', message: 'Length insufficient'}
  ],
  markUp: [
    { type: 'required', message: ' please enter the value' }
  ],
  stakeAvailable: [
    { type: 'required', message: ' please enter the value' }
  ]
}
  
  ngOnInit() {
    this.formInputFields = this.formBuilder.group({
      platform: ['', [Validators.required]],
      tName: ['', [Validators.required,Validators.minLength(4),]],
      buyIn:['',[Validators.required, Validators.min(0),Validators.pattern('^[0-9]+$')]],
      markUp:['',[Validators.required, Validators.min(1.0),Validators.pattern('^[0-9]+$')]],
      stakeAvailable:['',[Validators.required,Validators.min(0), Validators.max(100),Validators.pattern('^[0-9]+$')]]
        });
  }

  submit() {
    console.log("Added new staff..") 
    console.log(this.formInputFields);
    let data = {
      username : sessionStorage.getItem('username'),
      tournament : this.formInputFields.value
    }
    console.log(data);
    this.playerService.addTournament(data).subscribe((data) => {
      this.modalController.dismiss({added : true})
    })
  }

  onClose(){
    this.modalController.dismiss();
  }

}
