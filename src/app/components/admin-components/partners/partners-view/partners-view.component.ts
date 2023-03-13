import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import DataAndCheck from 'src/app/models/DataAndCheck';
import { NeighborhoodDto } from 'src/app/models/NeighborhoodDtos/NeighborhoodDto';
import PagedResponse from 'src/app/models/PagedResponse';
import { PartnerDto } from 'src/app/models/PartnerDtos/PartnerDto';
import { CityService } from 'src/app/services/city.service';
import { NeighborhoodService } from 'src/app/services/neighborhood.service';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partners-view',
  templateUrl: './partners-view.component.html',
  styleUrls: ['./partners-view.component.scss']
})
export class PartnersViewComponent {
  constructor(
    private partnerService: PartnerService,
    private router: Router,

  ) { }
  partnersPagedResponse!: PagedResponse<PartnerDto>;
  partnersAndCheck = Array<DataAndCheck<PartnerDto>>();
  selectedPartners = Array<number>();
  loading: boolean = true;
  allSelected: boolean = false;

  async ngOnInit() {
    let params = new HttpParams();
    params = params.set("page-size", 100);
    params = params.set("page-number", 1);

    this.partnersPagedResponse = await firstValueFrom(this.partnerService.GetPartnersPaged(params));
    this.partnersPagedResponse.Data.forEach(partner => {
      let partnerAndCheck = new DataAndCheck(partner);
      this.partnersAndCheck.push(partnerAndCheck);
    });


    this.loading = false;
    console.log(this.partnersAndCheck);
  }

  selectPartner(id: number) {
    let selectedPartner_ID = this.partnersAndCheck.findIndex(x => x.Data.Partner_ID == id);
    if (this.selectedPartners.includes(id)) {
      let index = this.selectedPartners.indexOf(id);
      this.selectedPartners.splice(index, 1);
      this.partnersAndCheck[selectedPartner_ID].checked = false;
    } else {
      this.selectedPartners.push(id);
      this.partnersAndCheck[selectedPartner_ID].checked = true;
    }

    if (this.selectedPartners.length == this.partnersAndCheck.length) {
      this.allSelected = true;
    } else {
      this.allSelected = false;
    }
    console.log(this.selectedPartners);
  }
  selectAll() {
    if (this.allSelected == false) {
      this.partnersAndCheck.forEach(element => {
        element.checked = true;
        if (!this.selectedPartners.includes(element.Data.Partner_ID)) {
          this.selectedPartners.push(element.Data.Partner_ID);
        }
      });
      this.allSelected = true;
    } else {
      this.partnersAndCheck.forEach(element => {
        element.checked = false;
      });
      this.selectedPartners = [];
      this.allSelected = false;
    }
  }
  searchQuery = "";
  async Search() {
    this.loading = true;
    this.selectedPartners = [];
    this.allSelected = false;
    let params = new HttpParams();
    params = params.set("page-size", 100);
    params = params.set("page-number", 1);
    params = params.set("search", this.searchQuery);

    this.partnersPagedResponse = await firstValueFrom(this.partnerService.GetPartnersPaged(params));
    this.partnersAndCheck = [];
    this.partnersPagedResponse.Data.forEach(partner => {
      let partnerAndCheck = new DataAndCheck<PartnerDto>(partner);
      this.partnersAndCheck.push(partnerAndCheck);
    });
    console.log(this.partnersPagedResponse);
    this.loading = false;
  }
  async DeleteSelectedPartners(selectAction: string) {
    console.log(selectAction);
    if (selectAction == "Delete" && this.selectedPartners.length > 0) {
      this.allSelected = false;
      let params = new HttpParams();

      params = params.appendAll({ "ids": this.selectedPartners });

      let response = await firstValueFrom(this.partnerService.DeletePartners(params));
      console.log(response);
      window.location.reload();
    }
  }
}
