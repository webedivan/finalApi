import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../../cliente';
import { Venta } from 'src/app/venta';
import { Producto } from 'src/app/producto';
import { DetalleVenta } from 'src/app/detalle-venta';
import { VentaService } from '../../services/venta.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProductoService } from 'src/app/services/producto.service';
import { DetalleVentaService } from '../../services/detalle-venta.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  total = 0;

  venta = new Venta();
  detalles: DetalleVenta[] = [];

  listaClientes: Cliente[] = [];
  listaProductos: Producto[] = [];

  constructor(private ventaService: VentaService,
              private clienteService: ClienteService,
              private productoService: ProductoService,
              private detalleVentaService: DetalleVentaService) { }

  ngOnInit() {
    this.venta.fechaVenta = this.obtenerHora();

    this.clienteService.listarClientes()
    .subscribe(resultado => {
      this.listaClientes = resultado.filter(cliente => cliente.estadoCliente == 'activo');
    });

    this.productoService.listarProductos()
    .subscribe(resultado => {
      this.listaProductos = resultado.filter(producto => producto.stock > 0);

      this.listaProductos.forEach(producto => {
        this.detalles.push({
          cantidad: 0,
          precioVenta: 0,
          producto: {
            idProducto: producto.idProducto
          },
          venta: {},
          lleva: false,
          precio: producto.precio
        });
      });
    });
  }

  obtenerHora(): string {
    const actual = new Date();
    let anio = actual.getFullYear();
    let mes: any = actual.getMonth() + 1;
    let dia: any = actual.getDate();
    if (mes < 10) mes = '0' + mes;
    if (dia < 10) dia = '0' + dia;
    return anio + '-' + mes + '-' + dia + 'T05:00:00Z[UTC]';
  }

  cambiado() {
    this.total = 0;
    this.detalles.forEach(detalle => {
      this.total += detalle.cantidad * detalle.precio;
    })
  }

  guardarVenta() {
    let lleva = false;
    this.detalles.forEach(detalle => {
      lleva = lleva || detalle.lleva;
    });
    if (!lleva) {
      alert('Debe seleccionar al menos un producto.');
      return;
    }

    this.ventaService.agregarVenta(this.venta)
    .subscribe(resultado => {
      const idVenta = resultado.idVenta;

      this.detalles.forEach(detalle => {
        detalle.venta = { idVenta: idVenta };
        detalle.precioVenta = detalle.cantidad * detalle.precio;
      });

      let cuenta = 0;
      this.detalles.forEach(detalle => {
        this.detalleVentaService.agregarDetalleVenta(detalle)
        .subscribe(() => {
          cuenta++;
          if (cuenta == this.detalles.length) {
            alert('Venta guardada exitosamente.');
          }
        });
      })
    });
  }

}
