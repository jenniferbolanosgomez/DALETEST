import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Productos } from '../models/producto';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductoService {
    myAppUrl = 'https://localhost:44337/';
    myApiUrl = 'api/Producto/';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'

        })

    }

    constructor(private http: HttpClient) { }


    obtenerListProductos(): Observable<Productos[]> {

        return this.http.get<Productos[]>(this.myAppUrl + this.myApiUrl);
    }

    mostrarProducto(id: number): Observable<Productos> {
        return this.http.get<Productos>(this.myAppUrl + this.myApiUrl + id, this.httpOptions);
    }

    almacenarProducto(producto: Productos): Observable<Productos> {
        debugger
        return this.http.post<Productos>(this.myAppUrl + this.myApiUrl, producto, this.httpOptions);

    }

    actualizarProducto(id: number, producto: Productos): Observable<Productos> {
        debugger
        return this.http.put<Productos>(this.myAppUrl + this.myApiUrl + id, producto, this.httpOptions);
    }

    eliminarProducto(id: number): Observable<Productos> {
        return this.http.delete<Productos>(this.myAppUrl + this.myApiUrl + id);
    }
}

