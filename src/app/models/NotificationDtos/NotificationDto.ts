export default class NotificationDto {
  Notification_ID!: number;
  Description: string | undefined;
  ActivationDate!: Date;
  IsActive!: boolean;
  Property_ID!: number;
}
