import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SocketService } from './socket.service';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([       
        {"path":"chat", "component":ChatComponent},
        {"path":"login", "component":LoginComponent},
        {"path":"users", "component":UsersComponent},
        {"path":"dashboard", "component":DashboardComponent},
    ]),
  ],
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
