import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConterpartiesViewComponent } from './conterparties-view.component';

describe('CitiesViewComponent', () => {
  let component: ConterpartiesViewComponent;
  let fixture: ComponentFixture<ConterpartiesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConterpartiesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConterpartiesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
