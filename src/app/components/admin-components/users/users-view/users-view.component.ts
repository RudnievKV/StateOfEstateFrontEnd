import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import DataAndCheck from 'src/app/models/DataAndCheck';
import PagedResponse from 'src/app/models/PagedResponse';
import UserDto from 'src/app/models/UserDtos/UserDto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent {
  value = "";
  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) { }
  usersPagedResponse!: PagedResponse<UserDto>;
  usersAndCheck = Array<DataAndCheck<UserDto>>();
  selectedUsers = Array<number>();
  loading: boolean = true;
  allSelected: boolean = false;

  async ngOnInit() {
    let params = new HttpParams();
    params = params.set("page-size", 100);
    params = params.set("page-number", 1);

    this.usersPagedResponse = await firstValueFrom(this.userService.GetUsersPaged(params));
    this.usersPagedResponse.Data.forEach(city => {
      let userAndCheck = new DataAndCheck(city);
      this.usersAndCheck.push(userAndCheck);
    });
    this.loading = false;
    console.log(this.usersAndCheck);
  }

  selectUser(id: number) {
    let selectedUser_ID = this.usersAndCheck.findIndex(x => x.Data.User_ID == id);
    if (this.selectedUsers.includes(id)) {
      let index = this.selectedUsers.indexOf(id);
      this.selectedUsers.splice(index, 1);
      this.usersAndCheck[selectedUser_ID].checked = false;
    } else {
      this.selectedUsers.push(id);
      this.usersAndCheck[selectedUser_ID].checked = true;
    }

    if (this.selectedUsers.length == this.usersAndCheck.length) {
      this.allSelected = true;
    } else {
      this.allSelected = false;
    }
    console.log(this.selectedUsers);
  }
  selectAll() {
    if (this.allSelected == false) {
      this.usersAndCheck.forEach(element => {
        element.checked = true;
        if (!this.selectedUsers.includes(element.Data.User_ID)) {
          this.selectedUsers.push(element.Data.User_ID);
        }
      });
      this.allSelected = true;
    } else {
      this.usersAndCheck.forEach(element => {
        element.checked = false;
      });
      this.selectedUsers = [];
      this.allSelected = false;
    }
  }

  searchQuery = "";
  async Search() {
    this.loading = true;
    this.selectedUsers = [];
    this.allSelected = false;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        query: this.searchQuery
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
    });
    let params = new HttpParams();
    params = params.set("page-size", 100);
    params = params.set("page-number", 1);
    params = params.set("search", this.searchQuery);

    this.usersPagedResponse = await firstValueFrom(this.userService.GetUsersPaged(params));
    this.usersAndCheck = [];
    this.usersPagedResponse.Data.forEach(user => {
      let userAndCheck = new DataAndCheck<UserDto>(user);
      this.usersAndCheck.push(userAndCheck);
    });
    console.log(this.usersPagedResponse);
    this.loading = false;
  }

  async DeleteSelectedUsers(selectAction: string) {
    console.log(selectAction);
    if (selectAction == "Delete") {
      this.allSelected = false;
      let params = new HttpParams();

      params = params.appendAll({ "ids": this.selectedUsers });

      let response = await firstValueFrom(this.userService.DeleteUsers(params));
      console.log(response);
    }
  }

}
