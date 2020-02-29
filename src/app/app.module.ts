import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

import  { RegisterService } from './services/register.service';
import { PhotoService } from './services/photo.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PhotoListComponent,
    NavbarComponent,
    FeedComponent,
    ProfileComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
