using DALEAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace DALEAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacturaController : Controller
    {
        private readonly IConfiguration _configuration;
        public FacturaController(IConfiguration configuration)
        {
            this._configuration = configuration;
        }


        // GET: FacturaController/Create
        [HttpPost]
        public ActionResult AgregarFactura([FromBody] Factura factura)
        {
            try
            {
                using (SqlConnection sqlconnection = new SqlConnection(_configuration.GetConnectionString("DALEAPI")))
                {
                    sqlconnection.Open();
                    SqlCommand sqlCmd = new SqlCommand("FacturaCrear", sqlconnection);
                    sqlCmd.CommandType = CommandType.StoredProcedure;
                    sqlCmd.Parameters.AddWithValue("IdProducto", factura.IdProducto);
                    sqlCmd.Parameters.AddWithValue("Cantidad", factura.Cantidad);
                    sqlCmd.Parameters.AddWithValue("ValorTotal", factura.ValorTotal);
                    sqlCmd.Parameters.AddWithValue("Cedula", factura.Cedula);
                    sqlCmd.ExecuteNonQuery();
                }
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

    }
}
