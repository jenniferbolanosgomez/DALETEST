import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clientes } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-ver-cliente',
  templateUrl: './ver-cliente.component.html',
  styleUrls: ['./ver-cliente.component.css']
})
export class VerClienteComponent implements OnInit {
  loading = false;
  cliente: Clientes;
  idCliente: number;

  constructor(private clienteService: ClienteService, private route: ActivatedRoute) {
    this.idCliente = +this.route.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.mostrarCliente();
  }

  mostrarCliente() {
    this.loading = true;
    this.clienteService.mostrarCliente(this.idCliente).subscribe(data => {
      this.loading = false;
      this.cliente = data;



    })

  }

}
