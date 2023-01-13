import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighborhoodChangeComponent } from './neighborhood-change.component';

describe('NeighborhoodChangeComponent', () => {
  let component: NeighborhoodChangeComponent;
  let fixture: ComponentFixture<NeighborhoodChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeighborhoodChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeighborhoodChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
