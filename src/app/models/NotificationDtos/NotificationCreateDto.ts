export default class NotificationCreateDto {
  Description: string | undefined;
  ActivationDate!: string;
  IsActive!: boolean;
  Property_ID!: number;
  constructor(Description: string, ActivationDate: string, IsActive: boolean, Property_ID: number) {
    this.Description = Description;
    this.ActivationDate = ActivationDate;
    this.IsActive = IsActive;
    this.Property_ID = Property_ID;
  }
}
