import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { BenefitDto } from 'src/app/models/BenefitDtos/BenefitDto';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import DataAndCheck from 'src/app/models/DataAndCheck';
import PagedResponse from 'src/app/models/PagedResponse';
import { BenefitService } from 'src/app/services/benefit.service';

@Component({
  selector: 'app-benefits-view',
  templateUrl: './benefits-view.component.html',
  styleUrls: ['./benefits-view.component.scss']
})
export class BenefitsViewComponent {
  constructor(
    private benefitService: BenefitService,
    private router: Router,

  ) { }
  benefitsPagedResponse!: PagedResponse<BenefitDto>;
  benefitsAndCheck = Array<DataAndCheck<BenefitDto>>();
  selectedBenefits = Array<number>();
  loading: boolean = true;
  allSelected: boolean = false;

  async ngOnInit() {
    let params = new HttpParams();
    params = params.set("page-size", 100);
    params = params.set("page-number", 1);

    this.benefitsPagedResponse = await firstValueFrom(this.benefitService.GetBenefitsPaged(params));
    this.benefitsPagedResponse.Data.forEach(benefit => {
      let benefitAndCheck = new DataAndCheck(benefit);
      this.benefitsAndCheck.push(benefitAndCheck);
    });
    this.loading = false;
    console.log(this.benefitsAndCheck);
  }
  selectBenefit(id: number) {
    let selectedBenefit_ID = this.benefitsAndCheck.findIndex(x => x.Data.Benefit_ID == id);
    if (this.selectedBenefits.includes(id)) {
      let index = this.selectedBenefits.indexOf(id);
      this.selectedBenefits.splice(index, 1);
      this.benefitsAndCheck[selectedBenefit_ID].checked = false;
    } else {
      this.selectedBenefits.push(id);
      this.benefitsAndCheck[selectedBenefit_ID].checked = true;
    }

    if (this.selectedBenefits.length == this.benefitsAndCheck.length) {
      this.allSelected = true;
    } else {
      this.allSelected = false;
    }
    console.log(this.selectedBenefits);
  }
  selectAll() {
    if (this.allSelected == false) {
      this.benefitsAndCheck.forEach(element => {
        element.checked = true;
        if (!this.selectedBenefits.includes(element.Data.Benefit_ID)) {
          this.selectedBenefits.push(element.Data.Benefit_ID);
        }
      });
      this.allSelected = true;
    } else {
      this.benefitsAndCheck.forEach(element => {
        element.checked = false;
      });
      this.selectedBenefits = [];
      this.allSelected = false;
    }
  }
  DisplayBenefitName(benefitDtoAndCheck: DataAndCheck<BenefitDto>) {
    let benefit = benefitDtoAndCheck.Data;
    return benefit.Local_Benefits.find(element => element.Local.LocalizationCode == 'ru')?.LocalBenefitName;
  }
  searchQuery = "";
  async Search() {
    this.loading = true;
    this.selectedBenefits = [];
    this.allSelected = false;
    let params = new HttpParams();
    params = params.set("page-size", 100);
    params = params.set("page-number", 1);
    params = params.set("search", this.searchQuery);

    this.benefitsPagedResponse = await firstValueFrom(this.benefitService.GetBenefitsPaged(params));
    this.benefitsAndCheck = [];
    this.benefitsPagedResponse.Data.forEach(benefit => {
      let benefitAndCheck = new DataAndCheck<BenefitDto>(benefit);
      this.benefitsAndCheck.push(benefitAndCheck);
    });
    console.log(this.benefitsPagedResponse);
    this.loading = false;
  }
  async DeleteSelectedBenefits(selectAction: string) {
    console.log(selectAction);
    if (selectAction == "Delete") {
      this.allSelected = false;
      let params = new HttpParams();

      params = params.appendAll({ "ids": this.selectedBenefits });

      let response = await firstValueFrom(this.benefitService.DeleteBenefits(params));
      console.log(response);
    }
  }
}
