import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { BenefitCreateDto, LocalBenefitValue } from 'src/app/models/BenefitDtos/BenefitCreateDto';
import { BenefitDto } from 'src/app/models/BenefitDtos/BenefitDto';
import { LocalCityValue, CityCreateDto } from 'src/app/models/CityDtos/CityCreateDto';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import { BenefitService } from 'src/app/services/benefit.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-benefit-add',
  templateUrl: './benefit-add.component.html',
  styleUrls: ['./benefit-add.component.scss']
})
export class BenefitAddComponent {
  value = "";
  constructor(
    private activatedRoute: ActivatedRoute,
    private benefitService: BenefitService,
    private router: Router,
    private localService: LocalService,
  ) { }
  benefit!: BenefitDto;
  benefitNameEn = '';
  benefitNameRu = '';
  benefitNameTr = '';
  benefitNameMe = '';
  id!: number;
  async ngOnInit() {

  }
  async DeleteBenefit() {
    let result = await firstValueFrom(this.benefitService.DeleteBenefit(this.id));
    if (result == true) {
      this.router.navigateByUrl('admin/benefits/view-benefits')
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

    let benefitCreateDto = new BenefitCreateDto(local_Benefits);
    await firstValueFrom(this.benefitService.CreateBenefit(benefitCreateDto))
      .catch(error => {
        console.log(error);

      }).then(result => {
        this.router.navigateByUrl("admin/benefits/view-benefits");
      });

  }
  CurrentLanguage = 'Ru';
  SetLanguage(Language: string) {
    this.CurrentLanguage = Language;
  };
}
