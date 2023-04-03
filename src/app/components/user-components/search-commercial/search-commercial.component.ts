import { Component } from '@angular/core';

@Component({
  selector: 'app-search-commercial',
  templateUrl: './search-commercial.component.html',
  styleUrls: ['./search-commercial.component.scss']
})
export class SearchCommercialComponent {
  textContent = 'Продажа Добра Вода № 2579. Продается дом (109м2) в поселке Добры Воды. Участок 500м2. Паркинг на 2 автомобиля. Резервуар для воды 20м3. До моря 1500 метров. На участке растут: миндаль, мушмула, виноград, смоква, лимон. Вид на море. 1этаж: гостиная, кухня, спальня, санузел, терраса 2 этаж: 2 спальни, санузел, терраса';
  symbolLimit = 110;

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  selectedAll: any;
  channelDDList = [
    {
      "channelId": 0,
      "channelName": "SMS",
      "selected": false
    },
    {
      "channelId": 1,
      "channelName": "Voice",
      "selected": false
    },
    {
      "channelId": 2,
      "channelName": "FaceBook",
      "selected": false
    },
    {
      "channelId": 4,
      "channelName": "Twitter",
      "selected": false
    },
    {
      "channelId": 5,
      "channelName": "Push",
      "selected": false
    },
    {
      "channelId": 6,
      "channelName": "WeChat",
      "selected": false
    },
    {
      "channelId": 7,
      "channelName": "Skype For Business",
      "selected": false
    },
    {
      "channelId": 8,
      "channelName": "Email",
      "selected": false
    }
  ];


  selectAll() {
    for (var i = 0; i < this.channelDDList.length; i++) {
      this.channelDDList[i].selected = this.selectedAll;
    }
  }
  checkIfAllSelected() {
    this.selectedAll = this.channelDDList.every(function (item: any) {
      return item.selected == true;
    });
  }
  CurrentSearch = 'Buy';
  statusBuy: boolean = true;
  statusRent: boolean = false;
  statusId: boolean = false;
  SetSearch(Search: string) {
    this.CurrentSearch = Search;

    if (Search == 'Buy' && this.statusBuy == false) {
      this.statusBuy = true;
      this.statusRent = false;
      this.statusId = false;
    }
    else if (Search == 'Rent' && this.statusRent == false) {
      this.statusBuy = false;
      this.statusRent = true;
      this.statusId = false;
    }
    else if (Search == 'Id' && this.statusId == false) {
      this.statusBuy = false;
      this.statusRent = false;
      this.statusId = true;
    }

  };

  currentDropdown: any;

  toggleDropdown(menuName: string) {
    if (this.currentDropdown === menuName) {
      this.currentDropdown = null; // close the dropdown menu
    } else {
      this.currentDropdown = menuName; // open the dropdown menu
    }
  }
}
