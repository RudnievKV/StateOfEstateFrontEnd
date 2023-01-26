import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchByIdComponent } from './components/user-components/search-by-id/search-by-id.component';
import { EstateManagementComponent } from './components/user-components/estate-management/estate-management.component';
import { ResidencePermitComponent } from './components/user-components/residence-permit/residence-permit.component';
import { LoginComponent } from './components/admin-components/login/login.component';
import { DashboardComponent } from './components/admin-components/dashboard/dashboard.component';
import { CityAddComponent } from './components/admin-components/cities/city-add/city-add.component';
import { CityChangeComponent } from './components/admin-components/cities/city-change/city-change.component';
import { CitiesViewComponent } from './components/admin-components/cities/cities-view/cities-view.component';
import { PropertyAddComponent } from './components/admin-components/properties/property-add/property-add.component';
import { PropertyChangeComponent } from './components/admin-components/properties/property-change/property-change.component';
import { PropertiesViewComponent } from './components/admin-components/properties/properties-view/properties-view.component';
import { NeighborhoodAddComponent } from './components/admin-components/neighborhoods/neighborhood-add/neighborhood-add.component';
import { NeighborhoodChangeComponent } from './components/admin-components/neighborhoods/neighborhood-change/neighborhood-change.component';
import { NeighborhoodsViewComponent } from './components/admin-components/neighborhoods/neighborhoods-view/neighborhoods-view.component';
import { ConterpartiesViewComponent } from './components/admin-components/Counterparties/Counterparties-view/conterparties-view.component';
import { ConterpartyAddComponent } from './components/admin-components/Counterparties/Counterparty-add/conterparty-add.component';
import { ConterpartyChangeComponent } from './components/admin-components/Counterparties/Counterparty-change/conterparty-change.component';
import { ReminderAddComponent } from './components/admin-components/reminders/reminder-add/reminder-add.component';
import { RemindersViewComponent } from './components/admin-components/reminders/reminders-view/reminders-view.component';
import { ReminderChangeComponent } from './components/admin-components/reminders/reminder-change/reminder-change.component';
import { PartnerAddComponent } from './components/admin-components/partners/partner-add/partner-add.component';
import { PartnersViewComponent } from './components/admin-components/partners/partners-view/partners-view.component';
import { PartnerChangeComponent } from './components/admin-components/partners/partner-change/partner-change.component';
import { CommercialMainComponent } from './components/user-components/commercial/commercial-main/commercial-main.component';
import { CommercialSearchRentComponent } from './components/user-components/commercial/commercial-search-rent/commercial-search-rent.component';
import { CommercialSearchSaleComponent } from './components/user-components/commercial/commercial-search-sale/commercial-search-sale.component';
import { HouseSearchSaleComponent } from './components/user-components/houses/house-search-sale/house-search-sale.component';
import { HouseSearchRentComponent } from './components/user-components/houses/house-search-rent/house-search-rent.component';
import { HouseMainComponent } from './components/user-components/houses/house-main/house-main.component';
import { LandplotMainComponent } from './components/user-components/landplots/landplot-main/landplot-main.component';
import { LandplotSearchSaleComponent } from './components/user-components/landplots/landplot-search-sale/landplot-search-sale.component';
import { SearchSaleComponent } from './components/user-components/search-sale/search-sale.component';
import { SearchRentComponent } from './components/user-components/search-rent/search-rent.component';
import { HeaderComponent } from './components/user-components/header/header.component';
import { FooterComponent } from './components/user-components/footer/footer.component';
import { HomeComponent } from './components/user-components/home/home.component';
import { environment } from '../environments/environment';
import { AUTH_API_URL, MONTENEGRO_API_URL } from './app-injection-tokens';

import { JwtModule } from "@auth0/angular-jwt";
import { ACCESS_TOKEN_KEY } from './services/auth.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UsersViewComponent } from './components/admin-components/users/users-view/users-view.component';
import { UserAddComponent } from './components/admin-components/users/user-add/user-add.component';
import { UserChangeComponent } from './components/admin-components/users/user-change/user-change.component';
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminHeaderComponent } from './components/admin-components/admin-header/admin-header.component'

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,

    // USER COMPONENTS
    SearchSaleComponent,
    SearchRentComponent,
    SearchByIdComponent,
    ResidencePermitComponent,
    HeaderComponent,
    FooterComponent,
    EstateManagementComponent,
    HomeComponent,

    CommercialMainComponent,
    CommercialSearchRentComponent,
    CommercialSearchSaleComponent,

    HouseSearchSaleComponent,
    HouseSearchRentComponent,
    HouseMainComponent,

    LandplotMainComponent,
    LandplotSearchSaleComponent,

    SearchByIdComponent,
    EstateManagementComponent,
    ResidencePermitComponent,

    PartnersViewComponent,
    PartnerChangeComponent,
    PartnerAddComponent,





    // ADMIN COMPONENTS
    LoginComponent,
    DashboardComponent,

    CityAddComponent,
    CityChangeComponent,
    CitiesViewComponent,

    PropertyAddComponent,
    PropertyChangeComponent,
    PropertiesViewComponent,

    NeighborhoodAddComponent,
    NeighborhoodChangeComponent,
    NeighborhoodsViewComponent,
    NotFoundComponent,
    UsersViewComponent,
    UserAddComponent,
    UserChangeComponent,
    AdminHeaderComponent,

    ConterpartiesViewComponent,
    ConterpartyAddComponent,
    ConterpartyChangeComponent,

    ReminderAddComponent,
    RemindersViewComponent,
    ReminderChangeComponent,
  ],
  imports: [
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    GoogleMapsModule,

    

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenWhiteListedDomains
      }
    })
  ],
  providers: [
    {
      provide: AUTH_API_URL,
      useValue: environment.authApi
    },
    {
      provide: MONTENEGRO_API_URL,
      useValue: environment.montenegroApi
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
