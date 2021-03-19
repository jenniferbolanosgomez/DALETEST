using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DALEAPI.Models
{
    public class Factura
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int IdProducto { get; set; }
        [Required]
        public int Cantidad { get; set; }
        [Required]
        public string ValorTotal { get; set; }
        [Required]
        public string Cedula { get; set; }
    }
}
