import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProductoComponent } from './components/producto/producto.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { ListaVentasComponent } from './components/lista-ventas/lista-ventas.component';

/*
/clientes
/productos
/ventas
/ventas/detalle
*/

const routes: Routes = [
  {path:'clientes', component:ClientesComponent},
  {path: 'productos', component: ProductoComponent},
  {path: 'ventas', component: VentasComponent},
  {path: 'ventas/detalle', component: ListaVentasComponent},
  {path:'', redirectTo:'/clientes', pathMatch:'full'},
  //{path: '**', component:ErrorComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { 
  
}
