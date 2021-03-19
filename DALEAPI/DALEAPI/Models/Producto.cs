using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DALEAPI.Models
{
    public class Producto
    {

        [Key]
        public int Id { get; set; }
        [Required]
        public string Nombre { get; set; }
        [Required]
        public double Valor { get; set; }
        [Required]
        public int Cantidad { get; set; }
  
    }
}
