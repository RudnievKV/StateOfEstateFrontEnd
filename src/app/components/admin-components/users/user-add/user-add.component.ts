import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import UserCreateDto from 'src/app/models/UserDtos/UserCreateDto';
import UserDto from 'src/app/models/UserDtos/UserDto';
import { UserTypeService } from 'src/app/services/user-type.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent {

  constructor(
    private userService: UserService,
    private userTypeService: UserTypeService,
    private router: Router,
  ) {

  }

  user!: UserDto;
  id!: number;
  email!: string;
  username!: string;
  password!: string;
  role!: string;

  async Save() {
    console.log(this.role);
    let userTypes = await firstValueFrom(this.userTypeService.GetUserTypes())
    let selectedUserType_ID = userTypes.find(element => element.UserTypeName == this.role)!.UserType_ID;


    let newUser = new UserCreateDto(
      this.email,
      this.username,
      this.password,
      selectedUserType_ID
    );

    await firstValueFrom(this.userService.CreateUser(newUser))
      .catch(error => {
        console.log(error);

      })
      .then(result => {
        this.router.navigateByUrl("admin/users/view-users");
      });
  }
}
