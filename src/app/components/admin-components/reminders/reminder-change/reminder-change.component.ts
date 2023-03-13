import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import { LocalNeighborhoodValue } from 'src/app/models/NeighborhoodDtos/NeighborhoodCreateDto';
import { NeighborhoodDto } from 'src/app/models/NeighborhoodDtos/NeighborhoodDto';
import { NeighborhoodUpdateDto } from 'src/app/models/NeighborhoodDtos/NeighborhoodUpdateDto';
import NotificationDto from 'src/app/models/NotificationDtos/NotificationDto';
import NotificationUpdateDto from 'src/app/models/NotificationDtos/NotificationUpdateDto';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';
import { CityService } from 'src/app/services/city.service';
import { LocalService } from 'src/app/services/local.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-reminder-change',
  templateUrl: './reminder-change.component.html',
  styleUrls: ['./reminder-change.component.scss']
})
export class ReminderChangeComponent {
  private routeSub!: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router,
    private propertyService: PropertyService,
    private cityService: CityService,
    private localService: LocalService,
  ) { }
  notification!: NotificationDto;
  properties!: Array<PropertyDto>;
  description = '';
  activationDate!: Date;
  isActive = false;

  id!: number;
  selectedProperty!: PropertyDto;
  async ngOnInit() {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.id = params['id'];
    });
    await firstValueFrom(this.notificationService.GetNotification(this.id))
      .catch(error => {
        console.log(error);
        this.router.navigateByUrl('admin/notifications/view-notifications');
      })
      .then(result => {
        if (result) {
          this.notification = result;
        }
      });
    console.log(this.notification);
    if (this.notification == undefined) {
      //this.router.navigateByUrl('admin/cities/view-cities');
    }
    if (this.notification.Description) {
      this.description = this.notification.Description;
    }
    this.isActive = this.notification.IsActive;
    this.activationDate = this.notification.ActivationDate;
    this.properties = await firstValueFrom(this.propertyService.GetAllProperties());

    let property = this.properties.find(property => property.Property_ID == this.notification.Property_ID)
    if (property != undefined) {
      this.selectedProperty = property;
    }

  }
  async Delete() {
    let result = await firstValueFrom(this.notificationService.DeleteNotification(this.id));
    if (result == true) {
      this.router.navigateByUrl('admin/notifications/view-notifications');
    } else {
      alert("Ошибка! Удаление не произошло.");
    }
  }
  async Save() {

    let notificationUpdateDto = new NotificationUpdateDto(this.description, this.activationDate.toJSON(), this.isActive, this.selectedProperty.Property_ID);
    console.log(notificationUpdateDto);
    await firstValueFrom(this.notificationService.UpdateNotification(notificationUpdateDto, this.id))
      .catch(error => {
        console.log(error);

      }).then(result => {
        if (result) {
          this.router.navigateByUrl("admin/reminders/view-reminders");
        } else {

        }

      });
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
