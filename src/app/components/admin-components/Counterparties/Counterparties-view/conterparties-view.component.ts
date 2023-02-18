import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import CounterpartyDto from 'src/app/models/CounterpartyDtos/CounterpartyDto';
import DataAndCheck from 'src/app/models/DataAndCheck';
import PagedResponse from 'src/app/models/PagedResponse';
import { CounterpartyService } from 'src/app/services/counterparty.service';

@Component({
  selector: 'app-conterparties-view',
  templateUrl: './conterparties-view.component.html',
  styleUrls: ['./conterparties-view.component.scss']
})
export class ConterpartiesViewComponent {
  constructor(
    private counterpartyService: CounterpartyService,
    private router: Router,

  ) { }

  counterpartiesPagedResponse!: PagedResponse<CounterpartyDto>;
  counterpartiesAndCheck = Array<DataAndCheck<CounterpartyDto>>();
  selectedCounterparties = Array<number>();
  loading: boolean = true;
  allSelected: boolean = false;

  async ngOnInit() {
    let params = new HttpParams();
    params = params.set("page-size", 100);
    params = params.set("page-number", 1);

    this.counterpartiesPagedResponse = await firstValueFrom(this.counterpartyService.GetCounterpartiesPaged(params));
    this.counterpartiesPagedResponse.Data.forEach(counterparty => {
      let counterpartyAndCheck = new DataAndCheck(counterparty);
      this.counterpartiesAndCheck.push(counterpartyAndCheck);
    });
    this.loading = false;
    console.log(this.counterpartiesAndCheck);
  }
  selectCounterparty(id: number) {
    let selectedCounterparty_ID = this.counterpartiesAndCheck.findIndex(x => x.Data.Counterparty_ID == id);
    if (this.selectedCounterparties.includes(id)) {
      let index = this.selectedCounterparties.indexOf(id);
      this.selectedCounterparties.splice(index, 1);
      this.counterpartiesAndCheck[selectedCounterparty_ID].checked = false;
    } else {
      this.selectedCounterparties.push(id);
      this.counterpartiesAndCheck[selectedCounterparty_ID].checked = true;
    }

    if (this.selectedCounterparties.length == this.counterpartiesAndCheck.length) {
      this.allSelected = true;
    } else {
      this.allSelected = false;
    }
    console.log(this.selectedCounterparties);
  }
  selectAll() {
    if (this.allSelected == false) {
      this.counterpartiesAndCheck.forEach(element => {
        element.checked = true;
        if (!this.selectedCounterparties.includes(element.Data.Counterparty_ID)) {
          this.selectedCounterparties.push(element.Data.Counterparty_ID);
        }
      });
      this.allSelected = true;
    } else {
      this.counterpartiesAndCheck.forEach(element => {
        element.checked = false;
      });
      this.selectedCounterparties = [];
      this.allSelected = false;
    }
    console.log(this.selectedCounterparties);
  }
  value = "";
}
