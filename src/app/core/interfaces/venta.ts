import { Cliente } from "./cliente";
import { DetallesVenta } from "./detalles-venta";

export interface Venta {
    id:number;
    tipoPago: string;
    estado:string;
    fecha:Date;
    cliente: Cliente;
    nombres: string;
    direccion: string;
    codigoPostal: string;
    telefono: string;
    instrucciones: string;
    detallesVenta: DetallesVenta[];
    total: number;
}
