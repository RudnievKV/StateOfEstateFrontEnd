export default class NotificationDto {
  constructor(Notification_ID: number,
    Description: string | undefined,
    ActivationDate: any,
    IsActive: boolean,
    Property_ID: number) {
    this.Notification_ID = Notification_ID;
    this.Description = Description;
    this.ActivationDate = Object.assign(this, ActivationDate);
    this.IsActive = IsActive;
    this.Property_ID = Property_ID;
  }
  Notification_ID!: number;
  Description: string | undefined;
  ActivationDate!: Date;
  IsActive!: boolean;
  Property_ID!: number;
}
