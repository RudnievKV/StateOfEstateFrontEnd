import { HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, startWith, map, firstValueFrom, ReplaySubject, takeUntil, Subject, take, forkJoin, every } from 'rxjs';
import { BenefitDto } from 'src/app/models/BenefitDtos/BenefitDto';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import CounterpartyDto from 'src/app/models/CounterpartyDtos/CounterpartyDto';
import { LocalDto } from 'src/app/models/LocalDtos/LocalDto';
import { NeighborhoodDto } from 'src/app/models/NeighborhoodDtos/NeighborhoodDto';
import { PartnerDto } from 'src/app/models/PartnerDtos/PartnerDto';
import { LocalPropertyValue, PhotoPositionValue, PropertyCreateDto } from 'src/app/models/PropertyDtos/PropertyCreateDto';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';
import { LanguageCodeAndValue, TranslationDto } from 'src/app/models/TranslationDtos/TranslationDto';
import { BenefitService } from 'src/app/services/benefit.service';
import { CityService } from 'src/app/services/city.service';
import { CounterpartyService } from 'src/app/services/counterparty.service';
import { LocalService } from 'src/app/services/local.service';
import { NeighborhoodService } from 'src/app/services/neighborhood.service';
import { PartnerService } from 'src/app/services/partner.service';
import { PropertyService } from 'src/app/services/property.service';
import { TranslationService } from 'src/app/services/translation.service';



@Component({
  selector: 'app-property-add',
  templateUrl: './property-add.component.html',
  styleUrls: ['./property-add.component.scss']
})



export class PropertyAddComponent {

  toppings = new FormControl('');

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _partnerService: PartnerService,
    private _cityService: CityService,
    private _neighborhoodService: NeighborhoodService,
    private _benefitService: BenefitService,
    private _counterpartyService: CounterpartyService,
    private _propertyService: PropertyService,
    private _router: Router,
    private _localService: LocalService,
    private _translationService: TranslationService
  ) { }
  partner!: PartnerDto;
  locals!: Array<LocalDto>;
  id!: number;




  selectedRentStatus = 'Draft';
  selectedSaleStatus = 'Draft';

  saleTitleRu = '';
  saleDescriptionRu = '';
  rentTitleRu = '';
  rentDescriptionRu = '';

  saleTitleEn = '';
  saleDescriptionEn = '';
  rentTitleEn = '';
  rentDescriptionEn = '';

  saleTitleMe = '';
  saleDescriptionMe = '';
  rentTitleMe = '';
  rentDescriptionMe = '';

  saleTitleTr = '';
  saleDescriptionTr = '';
  rentTitleTr = '';
  rentDescriptionTr = '';

  notes = '';
  selectedCity !: CityDto;
  selectedNeighborhood !: NeighborhoodDto;
  selectedType = 'Apartment';
  houseAreaSquare = '';
  landAreaSquare = '';
  floor = '';
  floorsInABuilding = '';
  constructionYear = '';
  roomCount = '';
  selectedBedroomCount = '1';
  bathroomCount = '';
  rentPrice = '';
  rentPriceBeforeSeason = '';
  rentPriceFullSeason = '';
  salePrice = '';
  selectedCounterparty!: CounterpartyDto;
  counterAgentNumber = '';
  videoID = '';
  isForSale = false;
  rentPromoteStatus = false;
  salePromoteStatus = false;
  pets = false;
  turkishKebabs = false;
  additionalInfo = '';

  coordinateX = '';
  coordinateY = '';
  value = '';


  cities!: Array<CityDto>;
  /** control for the selected city */
  public cityCtrl = new FormControl<CityDto>(null as any);
  /** control for the MatSelect filter keyword */
  public cityFilterCtrl = new FormControl<string>('');
  /** list of cities filtered by search keyword */
  public filteredCities: ReplaySubject<CityDto[]> = new ReplaySubject<CityDto[]>(1);
  @ViewChild('citySelect', { static: true }) citySelect!: MatSelect;

  neighborhoods!: Array<NeighborhoodDto>;
  /** control for the selected city */
  public neighborhoodCtrl = new FormControl<NeighborhoodDto>(null as any);
  /** control for the MatSelect filter keyword */
  public neighborhoodFilterCtrl = new FormControl<string>('');
  /** list of cities filtered by search keyword */
  public filteredNeighborhoods: ReplaySubject<NeighborhoodDto[]> = new ReplaySubject<NeighborhoodDto[]>(1);
  @ViewChild('neighborhoodSelect', { static: true }) neighborhoodSelect!: MatSelect;

  benefits!: Array<BenefitDto>;
  /** control for the selected bank for multi-selection */
  public benefitMultiCtrl = new FormControl<BenefitDto[]>([]);
  /** control for the MatSelect filter keyword multi-selection */
  public benefitMultiFilterCtrl = new FormControl<string>('');
  /** list of banks filtered by search keyword */
  public filteredBenefitsMulti: ReplaySubject<BenefitDto[]> = new ReplaySubject<BenefitDto[]>(1);
  @ViewChild('benefitSelect', { static: true }) benefitSelect!: MatSelect;

  counterparties!: Array<CounterpartyDto>;
  /** control for the selected city */
  public counterpartyCtrl = new FormControl<CounterpartyDto>(null as any);
  /** control for the MatSelect filter keyword */
  public counterpartyFilterCtrl = new FormControl<string>('');
  /** list of cities filtered by search keyword */
  public filteredCounterparties: ReplaySubject<CounterpartyDto[]> = new ReplaySubject<CounterpartyDto[]>(1);
  @ViewChild('counterpartySelect', { static: true }) counterpartySelect!: MatSelect;


  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  async ngOnInit() {
    let citiesObservable = this._cityService.GetAllCities();
    let neighborhoodsObservable = this._neighborhoodService.GetAllNeighborhoods();
    let benefitsObservable = this._benefitService.GetAllBenefits();
    let counterpartiesObservable = this._counterpartyService.GetAllCounterparties();

    let params = new HttpParams();
    params = params.set("page-size", 100);
    params = params.set("page-number", 1);
    let localsObservable = this._localService.GetLocalsPaged(params);

    let results = await firstValueFrom(forkJoin([citiesObservable, neighborhoodsObservable, benefitsObservable, counterpartiesObservable, localsObservable]));

    this.cities = results[0];
    this.neighborhoods = results[1];
    this.benefits = results[2];
    this.counterparties = results[3];
    this.locals = results[4].Data;


    // set initial selection
    this.cityCtrl.setValue(this.cities[0]);
    this.neighborhoodCtrl.setValue(this.neighborhoods[0]);
    this.benefitMultiCtrl.setValue([this.benefits[0], this.benefits[1]]);
    this.counterpartyCtrl.setValue(this.counterparties[0]);

    // load the initial bank list
    this.filteredCities.next(this.cities.slice());
    this.filteredNeighborhoods.next(this.neighborhoods.slice());
    this.filteredBenefitsMulti.next(this.benefits.slice());
    this.filteredCounterparties.next(this.counterparties.slice());

    // listen for search field value changes
    this.cityFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCities();
      });
    this.neighborhoodFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterNeighborhoods();
      });
    this.benefitMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBenefitsMulti();
      });
    this.counterpartyFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCounterparties();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }



  /**
 * Sets the initial value after the filteredBanks are loaded initially
 */
  protected setInitialValue() {
    this.filteredCities
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.citySelect.compareWith = (a: CityDto, b: CityDto) => {
          return a && b && a.City_ID === b.City_ID;
        }
      });
    this.filteredNeighborhoods
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.neighborhoodSelect.compareWith = (a: NeighborhoodDto, b: NeighborhoodDto) => {
          return a && b && a.Neighborhood_ID === b.Neighborhood_ID;
        }
      });
    this.filteredBenefitsMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.benefitSelect.compareWith = (a: BenefitDto, b: BenefitDto) => a && b && a.Benefit_ID === b.Benefit_ID;
      });
    this.filteredCounterparties
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.counterpartySelect.compareWith = (a: CounterpartyDto, b: CounterpartyDto) => {
          return a && b && a.Counterparty_ID === b.Counterparty_ID;
        }
      });
  }

  protected filterCities() {
    if (!this.cities) {
      return;
    }
    // get the search keyword
    let search = this.cityFilterCtrl.value;
    if (!search) {
      this.filteredCities.next(this.cities.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the cities
    this.filteredCities.next(
      this.cities.filter(city => {
        let name = this.DisplayCityName(city);
        console.log(name);
        if (name && search)
          return name.toLowerCase().indexOf(search) > -1;
        else
          return false;
      })
    );
  }

  protected filterNeighborhoods() {
    if (!this.neighborhoods) {
      return;
    }
    // get the search keyword
    let search = this.neighborhoodFilterCtrl.value;
    if (!search) {
      this.filteredNeighborhoods.next(this.neighborhoods.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the neighborhoods
    this.filteredNeighborhoods.next(
      this.neighborhoods.filter(neighborhood => {
        let name = this.DisplayNeighborhoodName(neighborhood);
        console.log(name);
        if (name && search)
          return name.toLowerCase().indexOf(search) > -1;
        else
          return false;
      })
    );
  }
  protected filterBenefitsMulti() {
    if (!this.benefits) {
      return;
    }
    // get the search keyword
    let search = this.benefitMultiFilterCtrl.value;
    if (!search) {
      this.filteredBenefitsMulti.next(this.benefits.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the benefits
    this.filteredBenefitsMulti.next(
      this.benefits.filter(benefit => {
        let name = this.DisplayBenefitName(benefit);
        console.log(name);
        if (name && search)
          return name.toLowerCase().indexOf(search) > -1;
        else
          return false;
      })
    );
  }

  protected filterCounterparties() {
    if (!this.cities) {
      return;
    }
    // get the search keyword
    let search = this.counterpartyFilterCtrl.value;
    if (!search) {
      this.filteredCounterparties.next(this.counterparties.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the cities
    this.filteredCounterparties.next(
      this.counterparties.filter(counterparty => {
        if (counterparty.FullName && search)
          return counterparty.FullName.toLowerCase().indexOf(search) > -1;
        else
          return false;
      })
    );
  }

  async Save() {

    let newProperty = new PropertyCreateDto();
    var formData: any = new FormData();

    if (this.selectedBedroomCount != "---" && this.selectedBedroomCount) {
      newProperty.BedroomCount = parseInt(this.selectedBedroomCount);

      formData.append(`BedroomCount`, this.selectedBedroomCount);
    }
    formData.append(`AdditionalInfo`, this.additionalInfo);
    formData.append(`BathroomCount`, this.bathroomCount);
    formData.append(`ConstructionYear`, this.constructionYear);
    if (this.coordinateX == '') {
      //formData.append(`CoordinateX`, null);
    } else {
      formData.append(`CoordinateX`, this.coordinateX.replace('.', ','));
    }
    if (this.coordinateY == '') {
      //formData.append(`CoordinateY`, null);
    } else {
      formData.append(`CoordinateY`, this.coordinateY.replace('.', ','));
    }
    formData.append(`CounterAgentNumber`, this.counterAgentNumber);
    formData.append(`FloorsInABuilding`, this.floorsInABuilding);
    formData.append(`HouseAreaSquare`, this.houseAreaSquare);
    formData.append(`LandAreaSquare`, this.landAreaSquare);
    formData.append(`Notes`, this.notes);
    formData.append(`Pets`, this.pets);
    //formData.append(`RentCode`, null);
    formData.append(`RentPrice`, this.rentPrice);
    formData.append(`RentPriceBeforeSeason`, this.rentPriceBeforeSeason);
    formData.append(`RentPriceFullSeason`, this.rentPriceFullSeason);
    formData.append(`RentStatus`, this.selectedRentStatus);
    formData.append(`SaleStatus`, this.selectedSaleStatus);
    formData.append(`RoomCount`, this.roomCount);
    //formData.append(`SaleCode`, null);
    formData.append(`SalePrice`, this.salePrice);
    formData.append(`SalePromoteStatus`, this.salePromoteStatus);
    formData.append(`TurkishKebabs`, this.turkishKebabs);
    formData.append(`Type`, this.selectedType);
    formData.append(`VideoID`, this.videoID);
    formData.append(`RentPromoteStatus`, this.rentPromoteStatus);
    formData.append(`Floor`, this.floor);
    formData.append(`IsForSale`, this.isForSale);

    newProperty.AdditionalInfo = this.additionalInfo;
    newProperty.BathroomCount = parseInt(this.bathroomCount);
    newProperty.ConstructionYear = parseInt(this.constructionYear);
    newProperty.CoordinateX = parseInt(this.coordinateX);
    newProperty.CoordinateY = parseInt(this.coordinateY);
    newProperty.CounterAgentNumber = parseInt(this.counterAgentNumber);
    newProperty.Floor = parseInt(this.floor);
    newProperty.FloorsInABuilding = parseInt(this.floorsInABuilding);
    newProperty.HouseAreaSquare = parseInt(this.houseAreaSquare);
    newProperty.LandAreaSquare = parseInt(this.landAreaSquare);
    newProperty.Notes = this.notes;
    newProperty.Pets = this.pets;
    newProperty.RentCode = null;
    newProperty.RentPrice = parseInt(this.rentPrice);
    newProperty.RentPriceBeforeSeason = parseInt(this.rentPriceBeforeSeason);
    newProperty.RentPriceFullSeason = parseInt(this.rentPriceFullSeason);
    newProperty.RentPromoteStatus = this.rentPromoteStatus;
    newProperty.RentStatus = this.selectedRentStatus;
    newProperty.SaleStatus = this.selectedSaleStatus;
    newProperty.RoomCount = parseInt(this.roomCount);
    newProperty.SaleCode = null;
    newProperty.SalePrice = parseInt(this.salePrice);
    newProperty.SalePromoteStatus = this.salePromoteStatus;
    newProperty.TurkishKebabs = this.turkishKebabs;
    newProperty.Type = this.selectedType;
    newProperty.VideoID = this.videoID;
    newProperty.IsForSale = this.isForSale;




    let localEnId = this.locals.find(s => s.LocalizationCode == 'en')!.Local_ID;
    let localRuId = this.locals.find(s => s.LocalizationCode == 'ru')!.Local_ID;
    let localTrId = this.locals.find(s => s.LocalizationCode == 'tr')!.Local_ID;
    let localMeId = this.locals.find(s => s.LocalizationCode == 'sr')!.Local_ID;

    let localEnRent = new LocalPropertyValue(localEnId, this.rentTitleEn, this.rentDescriptionEn, "Rent");
    let localRuRent = new LocalPropertyValue(localRuId, this.rentTitleRu, this.rentDescriptionRu, "Rent");
    let localTrRent = new LocalPropertyValue(localTrId, this.rentTitleTr, this.rentDescriptionTr, "Rent");
    let localMeRent = new LocalPropertyValue(localMeId, this.rentTitleMe, this.rentDescriptionMe, "Rent");

    let localEnSale = new LocalPropertyValue(localEnId, this.saleTitleEn, this.saleDescriptionEn, "Sale");
    let localRuSale = new LocalPropertyValue(localRuId, this.saleTitleRu, this.saleDescriptionRu, "Sale");
    let localTrSale = new LocalPropertyValue(localTrId, this.saleTitleTr, this.saleDescriptionTr, "Sale");
    let localMeSale = new LocalPropertyValue(localMeId, this.saleTitleMe, this.saleDescriptionMe, "Sale");
    let local_Properties = new Array<LocalPropertyValue>();
    local_Properties.push(localEnRent);
    local_Properties.push(localRuRent);
    local_Properties.push(localTrRent);
    local_Properties.push(localMeRent);

    local_Properties.push(localEnSale);
    local_Properties.push(localRuSale);
    local_Properties.push(localTrSale);
    local_Properties.push(localMeSale);
    newProperty.Local_Properties = local_Properties;

    newProperty.Photos = this.photos;

    let benefitIDs = new Array<number>();
    this.benefitMultiCtrl.value?.forEach(benefit => {
      benefitIDs.push(benefit.Benefit_ID);
    });
    newProperty.Benefit_IDs = benefitIDs;


    let cityID = this.cityCtrl.value?.City_ID;
    if (cityID) {
      newProperty.City_IDs = [cityID];
    }
    newProperty.City_IDs = [this.cityCtrl.value!.City_ID];
    let i = 0;


    console.log(newProperty.Local_Properties);
    for (let j = 0; j < newProperty.Local_Properties.length; j++) {
      formData.append(`Local_Properties[${i}].Local_ID`, JSON.stringify(newProperty.Local_Properties[i].Local_ID));
      formData.append(`Local_Properties[${i}].LocalPropertyTitle`, JSON.stringify(newProperty.Local_Properties[i].LocalPropertyTitle));
      formData.append(`Local_Properties[${i}].LocalPropertyDescription`, JSON.stringify(newProperty.Local_Properties[i].LocalPropertyDescription));
      i++;
    }
    i = 0;

    newProperty.Benefit_IDs.forEach(benefit_ID => {
      formData.append(`Benefit_IDs[${i}]`, benefit_ID);
      i++;
    });
    i = 0;

    newProperty.City_IDs.forEach(city_ID => {
      formData.append(`City_IDs[${i}]`, city_ID);
      i++;
    });
    i = 0;


    newProperty.Photos.forEach(photo => {
      formData.append(`Photos[${i}].position`, photo.Position);
      formData.append(`Photos[${i}].photo`, photo.Photo);
      i++;
    });
    i = 0;

    console.log(formData);

    await firstValueFrom(this._propertyService.CreateProperty(formData))
      .catch(error => {
        console.log(error);

      }).then(result => {
        this._router.navigateByUrl("admin/properties/view-properties");
      });
    console.log(this.cityCtrl.value);
  }

  DisplayCityName(cityDto: CityDto) {
    return cityDto.Local_Cities.find(element => element.Local.LocalizationCode == 'ru')?.LocalCityName;
  }
  DisplayNeighborhoodName(neighborhoodDto: NeighborhoodDto) {
    return neighborhoodDto.Local_Neighborhoods.find(element => element.Local.LocalizationCode == 'ru')?.LocalNeighborhoodName;
  }
  DisplayBenefitName(benefitDto: BenefitDto) {
    return benefitDto.Local_Benefits.find(element => element.Local.LocalizationCode == 'ru')?.LocalBenefitName;
  }

  photos = new Array<PhotoPositionValue>();

  AddPhoto() {
    let newPhoto = new PhotoPositionValue();
    let maxPosition = this.FindMaxPosition();
    if (this.photos.length > 0)
      maxPosition += 10;
    newPhoto.Position = maxPosition.toString();

    this.photos.push(newPhoto);
  }
  DeletePhoto(index: number) {
    this.photos.splice(index, 1);
  }

  FindMaxPosition(): number {
    let maxPosition = 0;

    this.photos.forEach(photo => {
      let currentPosition = 0;
      if (photo.Position) {
        currentPosition = parseInt(photo.Position);
      }
      if (maxPosition < currentPosition) {
        maxPosition = currentPosition;
      }
    });
    return maxPosition;
  }
  handleOneFileInput(index: number, event: Event) {
    let target = event?.target as HTMLInputElement;
    let files = target.files;
    this.photos[index].Photo = files?.item(0);
  }
  handleMultipleFileInputs(event: Event) {
    let target = event?.target as HTMLInputElement;
    let files = target.files;
    let maxPosition = this.FindMaxPosition();

    if (files) {


      for (let i = 0; i < files.length; i++) {
        let newPhoto = new PhotoPositionValue();
        newPhoto.Photo = files.item(i);

        console.log(maxPosition);
        if (this.photos.length > 0)
          maxPosition += 10;
        newPhoto.Position = maxPosition.toString();
        this.photos.push(newPhoto);
      }
    }
  }
  display: any;
  center: google.maps.LatLngLiteral = { lat: 42.291277033730374, lng: 18.84845106977263 };
  zoom = 13;
  mapOptions: google.maps.MapOptions = { draggableCursor: 'crosshair' };
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.pop();
    this.markerPositions.push(event.latLng!.toJSON());
    console.log(event);
    this.coordinateX = event.latLng!.lat().toFixed(6).toString();
    this.coordinateY = event.latLng!.lng().toFixed(6).toString();
  }
  CurrentLanguage = 'Ru';
  SetLanguage(Language: string) {
    this.CurrentLanguage = Language;
  };
}




