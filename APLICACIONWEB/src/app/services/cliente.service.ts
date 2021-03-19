import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Clientes } from '../models/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  myAppUrl = 'https://localhost:44337/';
  myApiUrl = 'api/Cliente/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'

    })

  }

  constructor(private http: HttpClient) { }


  obtenerListClientes(): Observable<Clientes[]> {

    return this.http.get<Clientes[]>(this.myAppUrl + this.myApiUrl);
  }

  mostrarCliente(id: number): Observable<Clientes> {
    return this.http.get<Clientes>(this.myAppUrl + this.myApiUrl + id, this.httpOptions);
  }

  mostrarClientexCedula(cedula: string): Observable<Clientes> {
    debugger
    return this.http.get<Clientes>(this.myAppUrl + this.myApiUrl + "clientecedula/" + cedula, this.httpOptions);
  }

  almacenarCliente(cliente: Clientes): Observable<Clientes> {
    debugger
    return this.http.post<Clientes>(this.myAppUrl + this.myApiUrl, cliente, this.httpOptions);

  }

  actualizarCliente(id: number, cliente: Clientes): Observable<Clientes> {
    debugger
    return this.http.put<Clientes>(this.myAppUrl + this.myApiUrl + id, cliente, this.httpOptions);
  }

  eliminarCliente(id: number): Observable<Clientes> {
    return this.http.delete<Clientes>(this.myAppUrl + this.myApiUrl + id);
  }
}

