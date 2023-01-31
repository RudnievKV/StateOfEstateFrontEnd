import { TestBed } from '@angular/core/testing';

import { AdvertisementSettingService } from './advertisement-setting.service';

describe('AdvertisementSettingService', () => {
  let service: AdvertisementSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertisementSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
