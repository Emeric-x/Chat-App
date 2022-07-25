import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { GroupsChatComponent } from './components/groups-chat/groups-chat.component';
import { ChatComponent } from './components/chat/chat.component';
import { AuthGuardService } from './services/auth-guard.service';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';

const appRoutes: Routes = [
  { path: '', component: GroupsChatComponent },
  { path: 'Signin', component: SignInComponent },
  { path: 'Signup', component: SignUpComponent }, 
  { path: 'GroupsChat', canActivate:[AuthGuardService], component: GroupsChatComponent },
  { path: 'Chat', canActivate:[AuthGuardService], component: ChatComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: '/not-found' }
]

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    GroupsChatComponent,
    ChatComponent,
    FourOhFourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ AuthGuardService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
