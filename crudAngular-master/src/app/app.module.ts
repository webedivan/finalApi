import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProductoComponent } from './components/producto/producto.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { ListaVentasComponent } from './components/lista-ventas/lista-ventas.component';
import { RoutingModule } from './routing.module';
import { InicioComponent } from './components/Inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ProductoComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    VentasComponent,
    ListaVentasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
