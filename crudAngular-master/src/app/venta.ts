import { Cliente } from './cliente';

export class Venta {
    idVenta: number;
    // estadoVenta: string;
    fechaVenta: string;
    cliente = new Cliente();
}
