import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConterpartyAddComponent } from './conterparty-add.component';

describe('CitiesViewComponent', () => {
  let component: ConterpartyAddComponent;
  let fixture: ComponentFixture<ConterpartyAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConterpartyAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConterpartyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
