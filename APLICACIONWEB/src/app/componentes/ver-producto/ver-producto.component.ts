import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Productos } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { FacturaService } from 'src/app/services/factura.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Facturas } from 'src/app/models/factura';
import swal from 'sweetalert';
import { Clientes } from 'src/app/models/cliente';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {
  facturas: FormGroup;
  loading = false;
  producto: Productos;
  idProducto: number;
  cantidadActual: number;
  cantidadVenta: number;
  cedula: string;
  precio: number;


  constructor(private productoService: ProductoService, private route: ActivatedRoute,
    private fb: FormBuilder, private facturaService: FacturaService, private router: Router,
    private clienteService: ClienteService) {
    this.facturas = this.fb.group({
      cantidad: ['', Validators.required],
      valorTotal: ['', Validators.required],
      cedula: ['', Validators.required],
    });
    if (+this.route.snapshot.paramMap.get('id') > 0) {
      this.idProducto = +this.route.snapshot.paramMap.get('id');

    }

  }

  ngOnInit(): void {
    this.mostrarProducto();
  }


  venderProducto() {
    debugger
    this.cantidadActual = this.producto.cantidad;
    this.cantidadVenta = this.facturas.get('cantidad').value
    this.cedula = this.facturas.get('cedula').value
    this.precio = this.producto.valor;
    if (this.cedula == "") {
      swal("Ingrese el número de cédula del cliente.");
      return false;
    }
    this.clienteService.mostrarClientexCedula(this.cedula).subscribe(data => {
      this.loading = false;
      var respCliente = data;
      if (respCliente.id != 0) {
        if (this.cantidadVenta <= 0 || this.cantidadVenta > this.cantidadActual) {
          swal("La cantidad de productos a vender supera el stock actual.");
          return false;
        } else {
          const factura: Facturas = {
            idProducto: this.idProducto,
            cantidad: this.cantidadVenta,
            valorTotal: ((this.cantidadVenta * this.precio).toString()),
            cedula: this.facturas.get('cedula').value,

          };
          this.facturaService.almacenarFactura(factura).subscribe(data => {
            swal("Compra ingresada satisfactoriamente.");
            this.router.navigate(['/productos']);
          });
        }
      }
      else {
        swal("El cliente que intenta ingresar no existe en nuestra base de datos.");
        return false;
      }
    })

  }
  mostrarProducto() {
    this.loading = true;
    this.productoService.mostrarProducto(this.idProducto).subscribe(data => {
      this.loading = false;
      this.producto = data;
    })
  }
  consultarCedula() {
    this.loading = true;
    this.clienteService.mostrarClientexCedula(this.facturas.get('cedula').value).subscribe(data => {
      this.loading = false;
      var respCliente = data;
    })
  }




}
