import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarClienteComponent } from './componentes/agregar-editar-cliente/agregar-editar-cliente.component';
import { AgregarEditarProductoComponent } from './componentes/agregar-editar-producto/agregar-editar-producto.component';
import { ListClientesComponent } from './componentes/list-clientes/list-clientes.component';
import { ListProductosComponent } from './componentes/list-productos/list-productos.component';
import { VerClienteComponent } from './componentes/ver-cliente/ver-cliente.component';
import { VerProductoComponent } from './componentes/ver-producto/ver-producto.component';

const routes: Routes = [
{path: 'add' , component: AgregarEditarClienteComponent},
{path: 'edit/:id', component: AgregarEditarClienteComponent},
{path: 'see/:id', component: VerClienteComponent },
{path: 'productos' , component: ListProductosComponent},
{path: 'venderproducto/:id' , component: VerProductoComponent},
{path: 'addproducto' , component: AgregarEditarProductoComponent},
{path: 'editproducto/:id' , component: AgregarEditarProductoComponent},
{path: '', component: ListClientesComponent, pathMatch:'full' },
{path: '**', redirectTo: '/'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
