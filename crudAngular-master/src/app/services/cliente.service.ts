import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cliente } from '../cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = 'http://node34481-env-0301010.jelastic.saveincloud.net/apiVentasCorp/v1/clientes';

  constructor(private http: HttpClient) { }

  listarClientes() {
    return this.http.get<Cliente[]>(this.url);
  }

  agregarCliente(cliente: Cliente) {
    return this.http.post<Cliente>(this.url, cliente);
  }

  actualizarCliente(id: number, cliente: Cliente) {
    return this.http.put<Cliente>(this.url + '/' + id, cliente);
  }

  eliminarCliente(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

}
