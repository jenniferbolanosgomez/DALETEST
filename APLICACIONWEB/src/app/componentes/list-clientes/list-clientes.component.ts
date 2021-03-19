import { Component, OnInit } from '@angular/core';
import { Clientes } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.css']
})
export class ListClientesComponent implements OnInit {
  listClientes: Clientes[];
  loading = false;
  constructor(private clienteService: ClienteService) {


  }
  ngOnInit(): void {
    this.mostrarCliente();
  }

  mostrarCliente() {
    debugger
    this.loading = true;
    this.clienteService.obtenerListClientes().subscribe(data => {
      this.loading = false;
      this.listClientes = data;
    })
  }

  eliminar(id: number) {
    this.loading = true;
    this.clienteService.eliminarCliente(id).subscribe(data => {
      this.mostrarCliente()
      this.loading = false;

    })

  }
}
