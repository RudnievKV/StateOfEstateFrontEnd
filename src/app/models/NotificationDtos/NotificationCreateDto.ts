export default class NotificationCreateDto {
  Description: string | undefined;
  ActivationDate!: Date;
  IsActive!: boolean;
  Property_ID!: number;
}
