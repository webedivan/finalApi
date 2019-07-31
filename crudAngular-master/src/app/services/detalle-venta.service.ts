import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DetalleVenta } from '../detalle-venta';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {

  url = 'http://node34481-env-0301010.jelastic.saveincloud.net/apiVentasCorp/v1/detalleVentas';

  constructor(private http: HttpClient) { }

  listarDetalleVentas() {
    return this.http.get<DetalleVenta[]>(this.url);
  }

  agregarDetalleVenta(detalleVenta: DetalleVenta) {
    return this.http.post<DetalleVenta>(this.url, detalleVenta);
  }

  actualizarDetalleVenta(id: number, detalleVenta: DetalleVenta) {
    return this.http.put<DetalleVenta>(this.url + '/' + id, detalleVenta);
  }

  eliminarDetalleVenta(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

}
