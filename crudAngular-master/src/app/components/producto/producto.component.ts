import { Component, OnInit } from '@angular/core';
import { Producto } from '../../producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  lista: Producto[] = [];
  producto = new Producto();

  constructor(private productoService: ProductoService) { }

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.productoService.listarProductos().subscribe(resultado => {
      this.lista = resultado;
    });
  }

  mostrarAgregar() {
    this.producto = new Producto();
  }

  mostrarModificar(cliente:Producto) {
    this.producto = cliente;
  }

  agregarOModificar() {
    if (this.producto.idProducto) {
      this.productoService.actualizarProducto(this.producto.idProducto, this.producto)
      .subscribe(resultado => {
        this.producto = new Producto();
        this.listar();
        alert('Se ha actualizado el producto.');
        window['$']('#modalFormProducto').modal('hide');
      }, error => {
        alert('Ha sucedido un error.');
      });
    } else {
      this.productoService.agregarProducto(this.producto)
      .subscribe(resultado => {
        this.producto = new Producto();
        this.listar();
        alert('Se ha agregado un producto.');
        window['$']('#modalFormProducto').modal('hide');
      }, error => {
        alert('Ha sucedido un error.');
      });
    }
  }

  mostrarEliminar(producto: Producto) {
    if (confirm(`¿Desea eliminar a ${producto.descripcion}?`)) {
      this.productoService.eliminarProducto(producto.idProducto)
      .subscribe(resultado => {
        this.listar();
        alert('Producto Eliminado.');
      }, error => {
        alert('error hdp');
      });
    }
  }

}
