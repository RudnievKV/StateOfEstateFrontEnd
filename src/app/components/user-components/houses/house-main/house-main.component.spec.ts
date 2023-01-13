import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseMainComponent } from './house-main.component';

describe('HouseMainComponent', () => {
  let component: HouseMainComponent;
  let fixture: ComponentFixture<HouseMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
