import { Proveedor } from "./proveedor";

export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
    descripcion: string;
    imagenURL: string;
    categoria: string;
    proveedor: Proveedor;
}
