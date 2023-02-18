import { PhotoDto } from "../PhotoDtos/PhotoDto";

export default class CounterpartyDto {
  Counterparty_ID!: number;
  Type!: string;
  FullName!: string;
  PhoneNumber!: string;
  PhoneNumber2!: string;
  PhoneNumber3!: string;
  Viber!: string;
  WhatsUp!: string;
  Telegram!: string;
  Email!: string;
  Website!: string;
  Description!: string;
  IsActive!: boolean;
  Properties!: Array<PropertyIdAndPhoto>;
}
export class PropertyIdAndPhoto {
  Property_ID!: number;
  Photos!: Array<PhotoDto>;
}
