import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeolocatePage } from './geolocate.page';

describe('GeolocatePage', () => {
  let component: GeolocatePage;
  let fixture: ComponentFixture<GeolocatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeolocatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeolocatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
