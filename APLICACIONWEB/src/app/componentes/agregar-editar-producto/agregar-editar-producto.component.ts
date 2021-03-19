import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Productos } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-agregar-editar-producto',
  templateUrl: './agregar-editar-producto.component.html',
  styleUrls: ['./agregar-editar-producto.component.css']
})
export class AgregarEditarProductoComponent implements OnInit {
  productos: FormGroup;
  idProducto = 0;
  accion = 'Agregar';
  loading = false;
  producto: Productos;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private productoService: ProductoService, private router: Router) {
    this.productos = this.fb.group({
      nombre: ['', Validators.required],
      valor: ['', Validators.required],
      cantidad: ['', Validators.required],
    });
    if (+this.route.snapshot.paramMap.get('id') > 0) {
      this.idProducto = +this.route.snapshot.paramMap.get('id');
    }
  }

  ngOnInit(): void {
    this.esEditar();
  }

  almacenarProducto() {
    debugger
    if (this.accion === 'Agregar') {
      const producto: Productos = {
        nombre: this.productos.get('nombre').value,
        valor: this.productos.get('valor').value,
        cantidad: this.productos.get('cantidad').value,
      };
      this.productoService.almacenarProducto(producto).subscribe(data => {
        this.router.navigate(['/productos']);
      });
    } else {
      const producto: Productos = {
        id: this.producto.id,
        nombre: this.productos.get('nombre').value,
        valor: this.productos.get('valor').value,
        cantidad: this.productos.get('cantidad').value,
      };
      this.productoService.actualizarProducto(this.idProducto, producto).subscribe(data => {
        this.router.navigate(['/productos']);

      });

    }
  }

  esEditar() {
    debugger
    if (this.idProducto > 0)
      this.accion = 'Editar';
    this.productoService.mostrarProducto(this.idProducto).subscribe(data => {
      this.producto = data;
      this.productos.patchValue({
        nombre: data.nombre,
        valor: data.valor,
        cantidad: data.cantidad
      });
    });
  }


}
