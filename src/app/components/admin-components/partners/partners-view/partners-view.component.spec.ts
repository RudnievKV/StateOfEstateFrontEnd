import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersViewComponent } from './partners-view.component';

describe('UserAddComponent', () => {
  let component: PartnersViewComponent;
  let fixture: ComponentFixture<PartnersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnersViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
