import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerChangeComponent } from './partner-change.component';

describe('UserAddComponent', () => {
  let component: PartnerChangeComponent;
  let fixture: ComponentFixture<PartnerChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
