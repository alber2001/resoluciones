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
import { PlanillaAyudaComponent } from './planilla-ayuda/planilla-ayuda.component';
import { CompXvejezComponent } from './comp-xvejez/comp-xvejez.component';
import { CertViudezComponent } from './cert-viudez/cert-viudez.component';
import { AscendenciaComponent } from './ascendencia/ascendencia.component';
import { InvalidezRiesgoComunComponent } from './invalidez-riesgo-comun/invalidez-riesgo-comun.component';
import { PensionPermanenteTotalComponent } from './pension-permanente-total/pension-permanente-total.component';
import { PensionPermanenteParcialComponent } from './pension-permanente-parcial/pension-permanente-parcial.component';
import { DevolucionComponent } from './devolucion/devolucion.component';
import { DevolucionViudezComponent } from './devolucion-viudez/devolucion-viudez.component';
import { ReporteBancoComponent } from './reporte-banco/reporte-banco.component';

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
    CertificacionNuevaComponent,
    PlanillaAyudaComponent,
    CompXvejezComponent,
    CertViudezComponent,
    AscendenciaComponent,
    InvalidezRiesgoComunComponent,
    PensionPermanenteTotalComponent,
    PensionPermanenteParcialComponent,
    DevolucionComponent,
    DevolucionViudezComponent,
    ReporteBancoComponent
    
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
