import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConterpartyChangeComponent } from './conterparty-change.component';

describe('CitiesViewComponent', () => {
  let component: ConterpartyChangeComponent;
  let fixture: ComponentFixture<ConterpartyChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConterpartyChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConterpartyChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
