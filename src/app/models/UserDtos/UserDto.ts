import UserTypeDto from "../UserTypeDtos/UserTypeDto";

export default class UserDto {
  constructor(user_ID: number,
    email: string,
    username: string,
    passwordHash: string,
    userType: UserTypeDto) {

  }
  User_ID!: number;
  Email!: string;
  Username!: string;
  PasswordHash!: string;
  UserType!: UserTypeDto;
}
