import { Producto } from "./producto";

export interface DetallesVenta {
    id: number;
    cantidad: number;
    producto: Producto;
    subtotal: number;
}
