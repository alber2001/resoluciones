import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReversoComponent } from './reverso/reverso.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { VejezComponent } from './vejez/vejez.component';
import { ViudezComponent } from './viudez/viudez.component';
import { VistaQrComponent } from './vista-qr/vista-qr.component';
import { TablasComponent } from './tablas/tablas.component';
import { InvalidezComponent } from './invalidez/invalidez.component';
import { CertificacionNuevaComponent } from './certificacion-nueva/certificacion-nueva.component';

@NgModule({
  declarations: [
    AppComponent,
    ReversoComponent,    
    AyudaComponent,
    VejezComponent,
    ViudezComponent,
    VistaQrComponent,
    TablasComponent,
    InvalidezComponent,
    CertificacionNuevaComponent
    
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
