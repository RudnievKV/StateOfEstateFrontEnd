import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  toppings = new FormControl('');

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

  showCheckbox = false;

  showCheckboxes() {
    this.showCheckbox = !this.showCheckbox;
  }

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


}

