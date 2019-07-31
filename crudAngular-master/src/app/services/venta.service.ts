import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Venta } from '../venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  url = 'http://node34481-env-0301010.jelastic.saveincloud.net/apiVentasCorp/v1/ventas';

  constructor(private http: HttpClient) { }

  listarVentas() {
    return this.http.get<Venta[]>(this.url);
  }

  agregarVenta(venta: Venta) {
    return this.http.post<Venta>(this.url, venta);
  }

  actualizarVenta(id: number, venta: Venta) {
    return this.http.put<Venta>(this.url + '/' + id, venta);
  }

  eliminarVenta(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

}
