import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesViewComponent } from './properties-view.component';

describe('PropertiesViewComponent', () => {
  let component: PropertiesViewComponent;
  let fixture: ComponentFixture<PropertiesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertiesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
