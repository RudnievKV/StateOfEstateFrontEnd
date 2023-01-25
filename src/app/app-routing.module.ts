import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesViewComponent } from './components/admin-components/cities/cities-view/cities-view.component';
import { CityAddComponent } from './components/admin-components/cities/city-add/city-add.component';
import { CityChangeComponent } from './components/admin-components/cities/city-change/city-change.component';
import { DashboardComponent } from './components/admin-components/dashboard/dashboard.component';
import { LoginComponent } from './components/admin-components/login/login.component';
import { PropertiesViewComponent } from './components/admin-components/properties/properties-view/properties-view.component';
import { PropertyAddComponent } from './components/admin-components/properties/property-add/property-add.component';
import { PropertyChangeComponent } from './components/admin-components/properties/property-change/property-change.component';
import { UserAddComponent } from './components/admin-components/users/user-add/user-add.component';
import { UserChangeComponent } from './components/admin-components/users/user-change/user-change.component';
import { UsersViewComponent } from './components/admin-components/users/users-view/users-view.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/user-components/home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: "prefix"
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        children: [
          {
            path: 'add-user',
            component: UserAddComponent,
          },
          {
            path: '',
            component: UsersViewComponent,
          },
          {
            path: ':id/change',
            component: UserChangeComponent,
          },
        ]
      },
      {
        path: 'properties',
        canActivate: [AuthGuard],
        children: [
          {
            path: 'add-property',
            component: PropertyAddComponent,
          },
          {
            path: 'view-properties',
            component: PropertiesViewComponent,
          },
          {
            path: ':id/change',
            component: PropertyChangeComponent,
          },
        ]
      },
      {
        path: 'cities',
        canActivate: [AuthGuard],
        children: [
          {
            path: 'add-city',
            component: CityAddComponent,
          },
          {
            path: 'view-cities',
            component: CitiesViewComponent,
          },
          {
            path: ':id/change',
            component: CityChangeComponent,
          },
        ]
      },
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
