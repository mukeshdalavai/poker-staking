import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AddTournamentPage } from './add-tournament.page';

describe('AddTournamentPage', () => {
  let component: AddTournamentPage;
  let fixture: ComponentFixture<AddTournamentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTournamentPage ],
      imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTournamentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
