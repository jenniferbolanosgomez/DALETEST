import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clientes } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-agregar-editar-cliente',
  templateUrl: './agregar-editar-cliente.component.html',
  styleUrls: ['./agregar-editar-cliente.component.css']
})
export class AgregarEditarClienteComponent implements OnInit {
  clientes: FormGroup;
  idCliente = 0;
  accion = 'Agregar';
  loading = false;
  cliente: Clientes;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private clienteService: ClienteService, private router: Router) {
    this.clientes = this.fb.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
    });
    if (+this.route.snapshot.paramMap.get('id') > 0) {
      this.idCliente = +this.route.snapshot.paramMap.get('id');
    }
  }

  ngOnInit(): void {
    this.esEditar();
  }

  almacenarCliente() {
    debugger
    if (this.accion === 'Agregar') {
      const cliente: Clientes = {
        cedula: this.clientes.get('cedula').value,
        nombre: this.clientes.get('nombre').value,
        apellido: this.clientes.get('apellido').value,
        telefono: this.clientes.get('telefono').value,
      };
      this.clienteService.almacenarCliente(cliente).subscribe(data => {
        this.router.navigate(['/']);
      });
    } else {
      const cliente: Clientes = {
        id: this.cliente.id,
        cedula: this.clientes.get('cedula').value,
        nombre: this.clientes.get('nombre').value,
        apellido: this.clientes.get('apellido').value,
        telefono: this.clientes.get('telefono').value,       
      };
      this.clienteService.actualizarCliente(this.idCliente, cliente).subscribe(data => {
        this.router.navigate(['/']);

      });

    }
    console.log(this.cliente);
  }

  esEditar() {
    debugger
    if (this.idCliente > 0)
      this.accion = 'Editar';
    this.clienteService.mostrarCliente(this.idCliente).subscribe(data => {
      this.cliente = data;
      this.clientes.patchValue({
        cedula: data.cedula,
        nombre: data.nombre,
        apellido: data.apellido,
        telefono: data.telefono
      });
    });
  }


}
