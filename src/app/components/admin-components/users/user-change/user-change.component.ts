import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import UserCreateDto from 'src/app/models/UserDtos/UserCreateDto';
import UserDto from 'src/app/models/UserDtos/UserDto';
import { CityService } from 'src/app/services/city.service';
import { UserTypeService } from 'src/app/services/user-type.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-change',
  templateUrl: './user-change.component.html',
  styleUrls: ['./user-change.component.scss']
})
export class UserChangeComponent {
  value = ""
  private routeSub!: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private userTypeService: UserTypeService,
    private router: Router,
  ) { }
  user!: UserDto;
  id!: number;
  email!: string;
  username!: string;
  password!: string;
  role!: string;
  async ngOnInit() {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.id = params['id'];
    });
    await firstValueFrom(this.userService.GetUser(this.id))
      .catch(error => {
        console.log(error);
        this.router.navigateByUrl('admin/cities/view-cities');
      })
      .then(result => {
        if (result) {
          this.user = result
        } else {

        }
      });
    console.log(this.user);
    this.email = this.user.Email;
    this.username = this.user.Username;
    this.role = this.user.UserType.UserTypeName;

  }
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

    await firstValueFrom(this.userService.UpdateUser(newUser, this.id))
      .catch(error => {
        console.log(error);

      })
      .then(result => {
        this.router.navigateByUrl("admin/cities/view-cities");
      });
  }
  async Delete() {
    await firstValueFrom(this.userService.DeleteUser(this.id))
      .catch(error => {
        console.log(error);

      })
      .then(result => {
        this.router.navigateByUrl("admin/cities/view-cities");
      });
  }
}

