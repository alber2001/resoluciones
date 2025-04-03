import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReversoComponent } from './reverso/reverso.component';
import { TablaComponent } from './tabla/tabla.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { VejezComponent } from './vejez/vejez.component';
import { ViudezComponent } from './viudez/viudez.component';
import { VistaQrComponent } from './vista-qr/vista-qr.component';

@NgModule({
  declarations: [
    AppComponent,
    ReversoComponent,
    TablaComponent,
    AyudaComponent,
    VejezComponent,
    ViudezComponent,
    VistaQrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
