import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import DataAndCheck from 'src/app/models/DataAndCheck';
import PagedResponse from 'src/app/models/PagedResponse';
import { PartnerDto } from 'src/app/models/PartnerDtos/PartnerDto';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';
import { PropertyService } from 'src/app/services/property.service';





@Component({
  selector: 'app-properties-view',
  templateUrl: './properties-view.component.html',
  styleUrls: ['./properties-view.component.scss']
})
export class PropertiesViewComponent {
  constructor(
    private propertyService: PropertyService,
    private router: Router,

  ) { }
  propertiesPagedResponse!: PagedResponse<PropertyDto>;
  propertiesAndCheck = Array<DataAndCheck<PropertyDto>>();
  selectedProperties = Array<number>();
  loading: boolean = true;
  allSelected: boolean = false;

  async ngOnInit() {
    let params = new HttpParams();
    params = params.set("page-size", 100);
    params = params.set("page-number", 1);

    this.propertiesPagedResponse = await firstValueFrom(this.propertyService.GetPropertiesPaged(params));
    this.propertiesPagedResponse.Data.forEach(property => {
      let propertyAndCheck = new DataAndCheck(property);
      this.propertiesAndCheck.push(propertyAndCheck);
    });


    this.loading = false;
    console.log(this.propertiesAndCheck);
  }

  selectProperty(id: number) {
    let selectedProperty_ID = this.propertiesAndCheck.findIndex(x => x.Data.Property_ID == id);
    if (this.selectedProperties.includes(id)) {
      let index = this.selectedProperties.indexOf(id);
      this.selectedProperties.splice(index, 1);
      this.propertiesAndCheck[selectedProperty_ID].checked = false;
    } else {
      this.selectedProperties.push(id);
      this.propertiesAndCheck[selectedProperty_ID].checked = true;
    }

    if (this.selectedProperties.length == this.propertiesAndCheck.length) {
      this.allSelected = true;
    } else {
      this.allSelected = false;
    }
    console.log(this.selectedProperties);
  }
  selectAll() {
    if (this.allSelected == false) {
      this.propertiesAndCheck.forEach(element => {
        element.checked = true;
        if (!this.selectedProperties.includes(element.Data.Property_ID)) {
          this.selectedProperties.push(element.Data.Property_ID);
        }
      });
      this.allSelected = true;
    } else {
      this.propertiesAndCheck.forEach(element => {
        element.checked = false;
      });
      this.selectedProperties = [];
      this.allSelected = false;
    }
  }
  searchQuery = "";
  async Search() {
    this.loading = true;
    this.selectedProperties = [];
    this.allSelected = false;
    let params = new HttpParams();
    params = params.set("page-size", 100);
    params = params.set("page-number", 1);
    params = params.set("search", this.searchQuery);

    this.propertiesPagedResponse = await firstValueFrom(this.propertyService.GetPropertiesPaged(params));
    this.propertiesAndCheck = [];
    this.propertiesPagedResponse.Data.forEach(property => {
      let propertyAndCheck = new DataAndCheck<PropertyDto>(property);
      this.propertiesAndCheck.push(propertyAndCheck);
    });
    console.log(this.propertiesPagedResponse);
    this.loading = false;
  }
  async DeleteSelectedProperties(selectAction: string) {
    console.log(selectAction);
    if (selectAction == "Delete" && this.selectedProperties.length > 0) {
      this.allSelected = false;
      let params = new HttpParams();

      params = params.appendAll({ "ids": this.selectedProperties });

      let response = await firstValueFrom(this.propertyService.DeleteProperties(params));
      console.log(response);
      window.location.reload();
    }
  }

}
