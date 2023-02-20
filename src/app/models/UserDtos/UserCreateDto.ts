export default class UserCreateDto {
  constructor(
    email: string,
    username: string,
    password: string,
    userType_ID: number) {
    this.Email = email;
    this.Username = username;
    this.Password = password;
    this.UserType_ID = userType_ID;
  }
  Email!: string;
  Username!: string;
  Password!: string;
  UserType_ID!: number;
}
