import UserTypeDto from "../UserTypeDtos/UserTypeDto";

export default class UserDto {
  User_ID!: number;
  Email!: string;
  Username!: string;
  PasswordHash!: string;
  UserType!: UserTypeDto;
}
