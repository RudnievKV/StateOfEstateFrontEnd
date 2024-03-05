import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightGalComponent } from './light-gal.component';

describe('LightGalComponent', () => {
  let component: LightGalComponent;
  let fixture: ComponentFixture<LightGalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightGalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightGalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
