import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/services/venta.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProductoService } from 'src/app/services/producto.service';
import { DetalleVentaService } from 'src/app/services/detalle-venta.service';
import { Cliente } from '../../cliente';
import { Venta } from '../../venta';
import { DetalleVenta } from '../../detalle-venta';

@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.css']
})
export class ListaVentasComponent implements OnInit {

  cargando = true;
  total = 0;

  clienteIndex = -1;
  ventaIndex = -1;

  listaClientes: Cliente[] = [];
  listaVentas: Venta[] = [];
  listaDetalles: DetalleVenta[] = [];

  constructor(private ventaService: VentaService,
              private clienteService: ClienteService,
              private productoService: ProductoService,
              private detalleVentaService: DetalleVentaService) { }

  ngOnInit() {
    this.cargando = true;
    this.clienteService.listarClientes()
    .subscribe(resultado => {
      this.cargando = false;
      this.listaClientes = resultado;
    });
  }

  clienteActualizado() {
    this.listaVentas = [];
    this.listaDetalles = [];
    const idCliente = this.listaClientes[this.clienteIndex].idCliente;

    this.cargando = true;
    this.ventaService.listarVentas()
    .subscribe(resultado => {
      this.cargando = false;
      this.listaVentas = resultado.filter(venta => {
        return venta.cliente.idCliente == idCliente;
      });
    });
  }

  ventaActualizada() {
    this.listaDetalles = [];
    const idVenta = this.listaVentas[this.ventaIndex].idVenta;

    this.total = 0;
    this.cargando = true;
    this.detalleVentaService.listarDetalleVentas()
    .subscribe(resultado => {
      this.cargando = false;
      this.listaDetalles = resultado.filter(detalle => {
        return detalle.venta.idVenta == idVenta;
      });

      this.listaDetalles.forEach(detalle => {
        this.total += detalle.precioVenta;
      });
    });
  }

}
