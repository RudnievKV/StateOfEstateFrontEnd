import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { LocalBenefitValue } from 'src/app/models/BenefitDtos/BenefitCreateDto';
import { BenefitDto } from 'src/app/models/BenefitDtos/BenefitDto';
import { BenefitUpdateDto } from 'src/app/models/BenefitDtos/BenefitUpdateDto';
import { LocalCityValue } from 'src/app/models/CityDtos/CityCreateDto';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import { CityUpdateDto } from 'src/app/models/CityDtos/CityUpdateDto';
import { BenefitService } from 'src/app/services/benefit.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-benefit-change',
  templateUrl: './benefit-change.component.html',
  styleUrls: ['./benefit-change.component.scss']
})
export class BenefitChangeComponent {
  private routeSub!: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private benefitService: BenefitService,
    private router: Router,
    private localService: LocalService,
  ) { }
  benefit!: BenefitDto;
  benefitNameEn: string = '';
  benefitNameRu: string = '';
  benefitNameTr: string = '';
  benefitNameMe: string = '';
  id!: number;
  async ngOnInit() {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.id = params['id'];
    });
    await firstValueFrom(this.benefitService.GetBenefit(this.id))
      .catch(error => {
        console.log(error);
        this.router.navigateByUrl('admin/benefits/view-benefits');
      })
      .then(result => {
        if (result) {
          this.benefit = result;
        }
      });
    console.log(this.benefit);
    if (this.benefit == undefined) {
      //this.router.navigateByUrl('admin/cities/view-cities');
    }
    let enLocale = this.benefit.Local_Benefits.find(s => s.Local.LocalizationCode == 'en');
    if (enLocale != undefined && enLocale.LocalBenefitName != null) {
      console.log(enLocale.LocalBenefitName);
      this.benefitNameEn = enLocale.LocalBenefitName;
    }
    let ruLocale = this.benefit.Local_Benefits.find(s => s.Local.LocalizationCode == 'ru');
    console.log(ruLocale);
    if (ruLocale != undefined && ruLocale.LocalBenefitName != null) {

      this.benefitNameRu = ruLocale.LocalBenefitName;
      console.log(this.benefitNameRu);
    }
    let meLocale = this.benefit.Local_Benefits.find(s => s.Local.LocalizationCode == 'sr');
    if (meLocale != undefined && meLocale.LocalBenefitName != null) {
      this.benefitNameMe = meLocale.LocalBenefitName;
      console.log(meLocale.LocalBenefitName);
    }
    let trLocale = this.benefit.Local_Benefits.find(s => s.Local.LocalizationCode == 'tr');
    if (trLocale != undefined && trLocale.LocalBenefitName != null) {
      this.benefitNameTr = trLocale.LocalBenefitName;
      console.log(trLocale.LocalBenefitName);
    }
  }
  async Delete() {
    let result = await firstValueFrom(this.benefitService.DeleteBenefit(this.id));
    if (result == true) {
      this.router.navigateByUrl('admin/benefits/view-benefits');
    } else {
      alert("Ошибка! Удаление не произошло.");
    }
  }
  async Save() {
    let params = new HttpParams();
    params = params.set("page-size", 100);
    params = params.set("page-number", 1);
    let locals = await firstValueFrom(this.localService.GetLocalsPaged(params));
    console.log(locals);

    let localEnId = locals.Data.find(s => s.LocalizationCode == 'en')!.Local_ID;
    let localRuId = locals.Data.find(s => s.LocalizationCode == 'ru')!.Local_ID;
    let localTrId = locals.Data.find(s => s.LocalizationCode == 'tr')!.Local_ID;
    let localMeId = locals.Data.find(s => s.LocalizationCode == 'sr')!.Local_ID;

    let localEn = new LocalBenefitValue(this.benefitNameEn, localEnId);
    let localRu = new LocalBenefitValue(this.benefitNameRu, localRuId);
    let localTr = new LocalBenefitValue(this.benefitNameTr, localTrId);
    let localMe = new LocalBenefitValue(this.benefitNameMe, localMeId);

    let local_Benefits = new Array<LocalBenefitValue>();
    local_Benefits.push(localEn);
    local_Benefits.push(localRu);
    local_Benefits.push(localTr);
    local_Benefits.push(localMe);

    let benefitUpdateDto = new BenefitUpdateDto(local_Benefits);
    console.log(benefitUpdateDto);
    await firstValueFrom(this.benefitService.UpdateBenefit(benefitUpdateDto, this.id))
      .catch(error => {
        console.log(error);
        //this.router.navigateByUrl('admin/cities/view-cities');
      })
      .then(result => {
        if (result) {
          this.router.navigateByUrl('admin/benefits/view-benefits');
        } else {

        }

      });
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }


  CurrentLanguage = 'Ru';
  SetLanguage(Language: string) {
    this.CurrentLanguage = Language;
  };
}
