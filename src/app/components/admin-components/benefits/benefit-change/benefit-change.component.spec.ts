import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitChangeComponent } from './benefit-change.component';

describe('BenefitChangeComponent', () => {
  let component: BenefitChangeComponent;
  let fixture: ComponentFixture<BenefitChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenefitChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
