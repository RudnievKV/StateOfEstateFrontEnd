import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandplotMainComponent } from './landplot-main.component';

describe('LandplotMainComponent', () => {
  let component: LandplotMainComponent;
  let fixture: ComponentFixture<LandplotMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandplotMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandplotMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
