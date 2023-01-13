import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialMainComponent } from './commercial-main.component';

describe('CommercialMainComponent', () => {
  let component: CommercialMainComponent;
  let fixture: ComponentFixture<CommercialMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
