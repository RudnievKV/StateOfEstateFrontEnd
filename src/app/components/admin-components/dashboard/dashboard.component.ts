import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BenefitCreateDto, LocalBenefitValue } from 'src/app/models/BenefitDtos/BenefitCreateDto';
import { BenefitService } from 'src/app/services/benefit.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(
    private benefitService: BenefitService,
  ) { }
  async ngOnInit() {
    let params = new HttpParams();
    params = params.set("page-size", 5);
    params = params.set("page-number", 5);
    console.log(params);
    let test = await firstValueFrom(this.benefitService.GetBenefitsPaged(params));
    console.log(test);
    let benefit = new BenefitCreateDto();
    let localBenefitValues = new Array<LocalBenefitValue>;
    let localBenefitValue = new LocalBenefitValue();
    localBenefitValue.LocalBenefitName = 'asd';
    localBenefitValue.Local_ID = 123;
    localBenefitValues.push(localBenefitValue);

    benefit.Local_Benefits = localBenefitValues;
    console.log(await firstValueFrom(this.benefitService.CreateBenefit(benefit)));
  }
}
