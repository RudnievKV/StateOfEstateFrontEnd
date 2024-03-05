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
import { NeighborhoodAddComponent } from './components/admin-components/neighborhoods/neighborhood-add/neighborhood-add.component';
import { NeighborhoodChangeComponent } from './components/admin-components/neighborhoods/neighborhood-change/neighborhood-change.component';
import { NeighborhoodsViewComponent } from './components/admin-components/neighborhoods/neighborhoods-view/neighborhoods-view.component';
import { ConterpartyAddComponent } from './components/admin-components/Counterparties/Counterparty-add/conterparty-add.component';
import { ConterpartiesViewComponent } from './components/admin-components/Counterparties/Counterparties-view/conterparties-view.component';
import { ConterpartyChangeComponent } from './components/admin-components/Counterparties/Counterparty-change/conterparty-change.component';
import { ReminderAddComponent } from './components/admin-components/reminders/reminder-add/reminder-add.component';
import { RemindersViewComponent } from './components/admin-components/reminders/reminders-view/reminders-view.component';
import { ReminderChangeComponent } from './components/admin-components/reminders/reminder-change/reminder-change.component';
import { PartnerAddComponent } from './components/admin-components/partners/partner-add/partner-add.component';
import { PartnersViewComponent } from './components/admin-components/partners/partners-view/partners-view.component';
import { PartnerChangeComponent } from './components/admin-components/partners/partner-change/partner-change.component';
import { BenefitAddComponent } from './components/admin-components/benefits/benefit-add/benefit-add.component';
import { BenefitsViewComponent } from './components/admin-components/benefits/benefits-view/benefits-view.component';
import { BenefitChangeComponent } from './components/admin-components/benefits/benefit-change/benefit-change.component';
import { AdvertisingComponent } from './components/admin-components/advertising/advertising.component';
import { SearchRentComponent } from './components/user-components/search-rent/search-rent.component';
import { UserPropertiesComponent } from './components/user-components/properties/user-properties/user-properties.component';
import { SearchSaleComponent } from './components/user-components/search-sale/search-sale.component';
import { SearchVillasComponent } from './components/user-components/search-villas/search-villas.component';
import { SearchPlotsComponent } from './components/user-components/search-plots/search-plots.component';
import { SearchCommercialComponent } from './components/user-components/search-commercial/search-commercial.component';
import { LightGalComponent } from './components/user-components/properties/light-gal/light-gal.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'search-rent',
        component: SearchRentComponent,
      },
      {
        path: 'search-sell',
        component: SearchSaleComponent,
      },
      {
        path: 'villas',
        component: SearchVillasComponent,
      },
      {
        path: 'commercial',
        component: SearchCommercialComponent,
      },
      {
        path: 'plots',
        component: SearchPlotsComponent,
      },
      {
        path: '123',
        component: LightGalComponent,
      },
      {
        path: 'properties',
        children: [
          {
            path: ':id',
            component: UserPropertiesComponent,
          },
        ],
      },
    ],
  },

  {
    path: 'admin',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'prefix',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
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
        ],
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
        ],
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
        ],
      },
      {
        path: 'neighborhoods',
        canActivate: [AuthGuard],
        children: [
          {
            path: 'add-neighborhood',
            component: NeighborhoodAddComponent,
          },
          {
            path: 'view-neighborhoods',
            component: NeighborhoodsViewComponent,
          },
          {
            path: ':id/change',
            component: NeighborhoodChangeComponent,
          },
        ],
      },
      {
        path: 'counterparties',
        canActivate: [AuthGuard],
        children: [
          {
            path: 'add-counterparty',
            component: ConterpartyAddComponent,
          },
          {
            path: 'view-counterpaties',
            component: ConterpartiesViewComponent,
          },
          {
            path: ':id/change',
            component: ConterpartyChangeComponent,
          },
        ],
      },
      {
        path: 'reminders',
        canActivate: [AuthGuard],
        children: [
          {
            path: 'add-reminder',
            component: ReminderAddComponent,
          },
          {
            path: 'view-reminders',
            component: RemindersViewComponent,
          },
          {
            path: ':id/change',
            component: ReminderChangeComponent,
          },
        ],
      },
      {
        path: 'partners',
        canActivate: [AuthGuard],
        children: [
          {
            path: 'add-partner',
            component: PartnerAddComponent,
          },
          {
            path: 'view-partners',
            component: PartnersViewComponent,
          },
          {
            path: ':id/change',
            component: PartnerChangeComponent,
          },
        ],
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
            path: 'view-users',
            component: UsersViewComponent,
          },
          {
            path: ':id/change',
            component: UserChangeComponent,
          },
        ],
      },
      {
        path: 'benefits',
        canActivate: [AuthGuard],
        children: [
          {
            path: 'add-benefit',
            component: BenefitAddComponent,
          },
          {
            path: 'view-benefits',
            component: BenefitsViewComponent,
          },
          {
            path: ':id/change',
            component: BenefitChangeComponent,
          },
        ],
      },
      {
        path: 'advertising',
        canActivate: [AuthGuard],
        children: [
          {
            path: 'view-advertising',
            component: AdvertisingComponent,
          },
        ],
      },
    ],
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
