import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { firstValueFrom, map } from 'rxjs';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import DataAndCheck from 'src/app/models/DataAndCheck';
import NotificationDto from 'src/app/models/NotificationDtos/NotificationDto';
import PagedResponse from 'src/app/models/PagedResponse';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-reminders-view',
  templateUrl: './reminders-view.component.html',
  styleUrls: ['./reminders-view.component.scss']
})
export class RemindersViewComponent {
  constructor(
    private notificationService: NotificationService,
    private router: Router,

  ) { }
  notificationsPagedResponse!: PagedResponse<NotificationDto>;
  notificationsAndCheck = Array<DataAndCheck<NotificationDto>>();
  selectedNotifications = Array<number>();
  loading: boolean = true;
  allSelected: boolean = false;

  async ngOnInit() {
    let params = new HttpParams();
    params = params.set("page-size", 100);
    params = params.set("page-number", 1);

    this.notificationsPagedResponse = await firstValueFrom(this.notificationService.GetNotificationsPaged(params));
    this.notificationsPagedResponse.Data.forEach(notification => {
      console.log(typeof (notification.ActivationDate));
      let notificationAndCheck = new DataAndCheck(notification);
      this.notificationsAndCheck.push(notificationAndCheck);
    });
    this.loading = false;
    console.log(this.notificationsAndCheck);
  }
  selectNotification(id: number) {
    let selectedNotification_ID = this.notificationsAndCheck.findIndex(x => x.Data.Notification_ID == id);
    if (this.selectedNotifications.includes(id)) {
      let index = this.selectedNotifications.indexOf(id);
      this.selectedNotifications.splice(index, 1);
      this.notificationsAndCheck[selectedNotification_ID].checked = false;
    } else {
      this.selectedNotifications.push(id);
      this.notificationsAndCheck[selectedNotification_ID].checked = true;
    }

    if (this.selectedNotifications.length == this.notificationsAndCheck.length) {
      this.allSelected = true;
    } else {
      this.allSelected = false;
    }
    console.log(this.selectedNotifications);
  }
  selectAll() {
    if (this.allSelected == false) {
      this.notificationsAndCheck.forEach(element => {
        element.checked = true;
        if (!this.selectedNotifications.includes(element.Data.Notification_ID)) {
          this.selectedNotifications.push(element.Data.Notification_ID);
        }
      });
      this.allSelected = true;
    } else {
      this.notificationsAndCheck.forEach(element => {
        element.checked = false;
      });
      this.selectedNotifications = [];
      this.allSelected = false;
    }
  }
  searchQuery = "";
  async Search() {
    this.loading = true;
    this.selectedNotifications = [];
    this.allSelected = false;
    let params = new HttpParams();
    params = params.set("page-size", 100);
    params = params.set("page-number", 1);
    params = params.set("search", this.searchQuery);

    this.notificationsPagedResponse = await firstValueFrom(this.notificationService.GetNotificationsPaged(params));
    this.notificationsAndCheck = [];
    this.notificationsPagedResponse.Data.forEach(notification => {
      let notificationAndCheck = new DataAndCheck<NotificationDto>(notification);
      this.notificationsAndCheck.push(notificationAndCheck);
    });
    console.log(this.notificationsPagedResponse);
    this.loading = false;
  }
  async DeleteSelectedNotifications(selectAction: string) {
    console.log(selectAction);
    if (selectAction == "Delete") {
      this.allSelected = false;
      let params = new HttpParams();

      params = params.appendAll({ "ids": this.selectedNotifications });

      let response = await firstValueFrom(this.notificationService.DeleteNotifications(params));
      console.log(response);
    }
  }
}

