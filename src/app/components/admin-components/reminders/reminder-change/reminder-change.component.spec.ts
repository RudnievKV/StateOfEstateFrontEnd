import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderChangeComponent } from './reminder-change.component';

describe('UserAddComponent', () => {
  let component: ReminderChangeComponent;
  let fixture: ComponentFixture<ReminderChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReminderChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReminderChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
