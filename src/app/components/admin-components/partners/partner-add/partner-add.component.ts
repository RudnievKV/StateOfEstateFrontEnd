import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, Observable, startWith } from 'rxjs';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import { LocalNeighborhoodValue, NeighborhoodCreateDto } from 'src/app/models/NeighborhoodDtos/NeighborhoodCreateDto';
import { NeighborhoodDto } from 'src/app/models/NeighborhoodDtos/NeighborhoodDto';
import { PartnerCreateDto } from 'src/app/models/PartnerDtos/PartnerCreateDto';
import { PartnerDto } from 'src/app/models/PartnerDtos/PartnerDto';
import { CityService } from 'src/app/services/city.service';
import { LocalService } from 'src/app/services/local.service';
import { NeighborhoodService } from 'src/app/services/neighborhood.service';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partner-add',
  templateUrl: './partner-add.component.html',
  styleUrls: ['./partner-add.component.scss']
})
export class PartnerAddComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private partnerService: PartnerService,
    private cityService: CityService,
    private router: Router,
    private localService: LocalService,
  ) { }
  filteredOptions!: Observable<CityDto[]>;

  partner!: PartnerDto;
  value = '';
  name = '';
  isRentActive = false;
  isSaleActive = false;
  email = '';
  website = '';
  notes = '';
  isSubscribedRent = false;
  isSubscribedSale = false;
  phones = Array<string>();
  id!: number;
  cities!: Array<CityDto>;
  selectedCity!: CityDto;
  myControl = new FormControl('');
  async ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.cities = await firstValueFrom(this.cityService.GetAllCities());
  }
  private _filter(value: string): CityDto[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter(option => {
      let name = this.DisplayCityName(option);
      console.log(name);
      if (name) {
        console.log(name.toLowerCase().includes(filterValue));
        return name.toLowerCase().includes(filterValue);
      }
      return false;
    });
  }
  async Save() {

    /*
    let partnerCreateDto = new PartnerCreateDto();
    await firstValueFrom(this.partnerService.CreatePartner(partnerCreateDto))
      .catch(error => {
        console.log(error);

      }).then(result => {
        this.router.navigateByUrl("admin/partners/view-partners");
      });
*/
  }
  DisplayCityName(cityDto: CityDto) {
    return cityDto.Local_Cities.find(element => element.Local.LocalizationCode == 'ru')?.LocalCityName;
  }
}
