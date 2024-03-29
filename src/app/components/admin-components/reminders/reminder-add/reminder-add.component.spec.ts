import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderAddComponent } from './reminder-add.component';

describe('UserAddComponent', () => {
  let component: ReminderAddComponent;
  let fixture: ComponentFixture<ReminderAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReminderAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReminderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
