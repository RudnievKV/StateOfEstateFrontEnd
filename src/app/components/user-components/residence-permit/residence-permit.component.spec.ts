import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidencePermitComponent } from './residence-permit.component';

describe('ResidencePermitComponent', () => {
  let component: ResidencePermitComponent;
  let fixture: ComponentFixture<ResidencePermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidencePermitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidencePermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
