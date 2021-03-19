import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Facturas } from '../models/factura';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FacturaService {
    myAppUrl = 'https://localhost:44337/';
    myApiUrl = 'api/Factura/';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'

        })

    }

    constructor(private http: HttpClient) { }


    almacenarFactura(factura: Facturas): Observable<Facturas> {
        debugger
        return this.http.post<Facturas>(this.myAppUrl + this.myApiUrl, factura, this.httpOptions);

    }

  
}

