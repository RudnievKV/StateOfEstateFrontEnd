export default class NotificationUpdateDto {
  Description: string | undefined;
  ActivationDate!: Date;
  IsActive!: boolean;
  Property_ID!: number;
}
