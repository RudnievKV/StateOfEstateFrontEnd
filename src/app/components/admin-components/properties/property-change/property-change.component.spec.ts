import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyChangeComponent } from './property-change.component';

describe('PropertyChangeComponent', () => {
  let component: PropertyChangeComponent;
  let fixture: ComponentFixture<PropertyChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
