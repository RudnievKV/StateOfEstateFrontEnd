import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighborhoodsViewComponent } from './neighborhoods-view.component';

describe('NeighborhoodsViewComponent', () => {
  let component: NeighborhoodsViewComponent;
  let fixture: ComponentFixture<NeighborhoodsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeighborhoodsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeighborhoodsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
