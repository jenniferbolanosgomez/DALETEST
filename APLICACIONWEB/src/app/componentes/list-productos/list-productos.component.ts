import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.css']
})
export class ListProductosComponent implements OnInit {
  listProductos: Productos[];
  loading = false;
  constructor(private productoService: ProductoService) {


  }
  ngOnInit(): void {
    this.mostrarProducto();
  }

  mostrarProducto() {
    this.loading = true;
    this.productoService.obtenerListProductos().subscribe(data => {
      this.loading = false;
      this.listProductos = data;
    })
  }

  eliminar(id: number) {
    this.loading = true;
    this.productoService.eliminarProducto(id).subscribe(data => {
      this.mostrarProducto()
      this.loading = false;

    })

  }
}
