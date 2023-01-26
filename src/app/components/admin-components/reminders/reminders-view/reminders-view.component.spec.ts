import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindersViewComponent } from './reminders-view.component';

describe('UserAddComponent', () => {
  let component: RemindersViewComponent;
  let fixture: ComponentFixture<RemindersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemindersViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemindersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
