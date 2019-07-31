import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  lista: Cliente[] = [];
  cliente = new Cliente();

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.clienteService.listarClientes()
    .subscribe(resultado => {
      this.lista = resultado;
    });
  }

  mostrarAgregar() {
    this.cliente = new Cliente();
  }

  mostrarModificar(cliente: Cliente) {
    this.cliente = cliente;
  }

  agregarOModificar() {
    if (this.cliente.idCliente) {
      this.clienteService.actualizarCliente(this.cliente.idCliente, this.cliente)
      .subscribe(resultado => {
        this.cliente = new Cliente();
        this.listar();
        alert('Se ha actualizado el cliente.');
        window['$']('#exampleModal').modal('hide');
      }, error => {
        alert('Ha sucedido un error.');
      });
    } else {
      this.clienteService.agregarCliente(this.cliente)
      .subscribe(resultado => {
        this.cliente = new Cliente();
        this.listar();
        alert('Se ha agregado el cliente.');
        window['$']('#exampleModal').modal('hide');
      }, error => {
        alert('Ha sucedido un error.');
      });
    }
  }

  mostrarEliminar(cliente: Cliente) {
    if (confirm(`¿Desea eliminar a ${cliente.nombres}?`)) {
      this.clienteService.eliminarCliente(cliente.idCliente)
      .subscribe(resultado => {
        this.listar();
        alert('Cliente Eliminado.');
      }, error => {
        alert('error hdp');
      });
    }
  }

}
