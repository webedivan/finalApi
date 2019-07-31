import { Venta } from './venta';
import { Producto } from './producto';

export class DetalleVenta {
    cantidad: number;
    precioVenta: number;
    venta: Partial<Venta> = new Venta();
    producto: Partial<Producto> = new Producto();

    // Abstractos
    lleva: boolean;
    precio: number;
}
