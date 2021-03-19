import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { AgregarEditarClienteComponent } from './componentes/agregar-editar-cliente/agregar-editar-cliente.component';
import { ListClientesComponent } from './componentes/list-clientes/list-clientes.component';
import { VerClienteComponent } from './componentes/ver-cliente/ver-cliente.component';
import { VerProductoComponent } from './componentes/ver-producto/ver-producto.component';
import { ListProductosComponent } from './componentes/list-productos/list-productos.component';
import { AgregarEditarProductoComponent } from './componentes/agregar-editar-producto/agregar-editar-producto.component';
import { AlertaComponent } from './componentes/alerta/alerta.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AgregarEditarClienteComponent,
    ListClientesComponent,
    VerClienteComponent,
    VerProductoComponent,
    ListProductosComponent,
    AgregarEditarProductoComponent,
    AlertaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
