import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvestorPage } from './investor.page';

describe('InvestorPage', () => {
  let component: InvestorPage;
  let fixture: ComponentFixture<InvestorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvestorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
