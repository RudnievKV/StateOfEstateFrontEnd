import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LocalCityValue, CityCreateDto } from 'src/app/models/CityDtos/CityCreateDto';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import NotificationCreateDto from 'src/app/models/NotificationDtos/NotificationCreateDto';
import NotificationDto from 'src/app/models/NotificationDtos/NotificationDto';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';
import { LocalService } from 'src/app/services/local.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-reminder-add',
  templateUrl: './reminder-add.component.html',
  styleUrls: ['./reminder-add.component.scss']
})
export class ReminderAddComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router,
    private propertyService: PropertyService,
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
    this.properties = await firstValueFrom(this.propertyService.GetAllProperties());
    console.log(this.properties);
  }
  async Save() {



    let notificationCreateDto = new NotificationCreateDto(this.description, this.activationDate.toJSON(), this.isActive, this.selectedProperty.Property_ID);
    console.log(notificationCreateDto);
    await firstValueFrom(this.notificationService.CreateNotification(notificationCreateDto))
      .catch(error => {
        console.log(error);

      }).then(result => {
        this.router.navigateByUrl("admin/reminders/view-reminders");
      });

  }
}
