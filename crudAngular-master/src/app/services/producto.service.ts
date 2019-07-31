import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Producto } from '../producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url = 'http://node34481-env-0301010.jelastic.saveincloud.net/apiVentasCorp/v1/productos';

  constructor(private http: HttpClient) { }

  listarProductos() {
    return this.http.get<Producto[]>(this.url);
  }

  agregarProducto(producto: Producto) {
    return this.http.post<Producto>(this.url, producto);
  }

  actualizarProducto(id: number, producto: Producto) {
    return this.http.put<Producto>(this.url + '/' + id, producto);
  }

  eliminarProducto(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

}
