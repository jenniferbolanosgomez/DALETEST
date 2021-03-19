using DALEAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace DALEAPI.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : Controller
    {
        private readonly IConfiguration _configuration;

        public ProductoController(IConfiguration configuration)
        {
            this._configuration = configuration;
        }
        // GET: ProductoController
        [HttpGet]
        public ActionResult ObtenerProductos()
        {
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection sqlconnection = new SqlConnection(_configuration.GetConnectionString("DALEAPI")))
                {
                    sqlconnection.Open();
                    SqlDataAdapter sqlDA = new SqlDataAdapter("ProductoConsultar", sqlconnection);
                    sqlDA.SelectCommand.CommandType = CommandType.StoredProcedure;
                    sqlDA.Fill(dt);

                }
                var result = JsonConvert.SerializeObject(dt);
                return Ok(result.ToLower());

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // GET: ProductoController/Details/5
        [HttpGet("{id}")]
        public ActionResult ObtenerProductoxId(int id)
        {
            Producto producto = new Producto();
            try
            {
                using (SqlConnection sqlconnection = new SqlConnection(_configuration.GetConnectionString("DALEAPI")))
                {
                    DataTable dt = new DataTable();
                    sqlconnection.Open();
                    SqlDataAdapter sqlDA = new SqlDataAdapter("ProductoxId", sqlconnection);
                    sqlDA.SelectCommand.CommandType = CommandType.StoredProcedure;
                    sqlDA.SelectCommand.Parameters.AddWithValue("Id", id);
                    sqlDA.Fill(dt);
                    if (dt.Rows.Count == 1)
                    {
                        producto.Id = Convert.ToInt32(dt.Rows[0]["Id"].ToString());
                        producto.Nombre = dt.Rows[0]["Nombre"].ToString();
                        producto.Valor = Convert.ToDouble(dt.Rows[0]["Valor"].ToString());
                        producto.Cantidad = Convert.ToInt32(dt.Rows[0]["Cantidad"].ToString());
                    }
                    return Ok(producto);
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // GET: ProductoController/Create
        [HttpPost]
        public ActionResult AgregarProducto([FromBody] Producto producto)
        {
            try
            {
                using (SqlConnection sqlconnection = new SqlConnection(_configuration.GetConnectionString("DALEAPI")))
                {
                    sqlconnection.Open();
                    SqlCommand sqlCmd = new SqlCommand("ProductoCrear", sqlconnection);
                    sqlCmd.CommandType = CommandType.StoredProcedure;
                    sqlCmd.Parameters.AddWithValue("Nombre", producto.Nombre);
                    sqlCmd.Parameters.AddWithValue("Valor", producto.Valor);
                    sqlCmd.Parameters.AddWithValue("Cantidad", producto.Cantidad);
                    sqlCmd.ExecuteNonQuery();
                }
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


        // GET: ProductoController/Edit/5
        [HttpPut("{id}")]
        public ActionResult ActualizarProducto(int id, [FromBody] Producto producto)
        {
            try
            {
                using (SqlConnection sqlconnection = new SqlConnection(_configuration.GetConnectionString("DALEAPI")))
                {
                    sqlconnection.Open();
                    SqlCommand sqlCmd = new SqlCommand("ProductoeModificar", sqlconnection);
                    sqlCmd.CommandType = CommandType.StoredProcedure;
                    sqlCmd.Parameters.AddWithValue("Id", id);
                    sqlCmd.Parameters.AddWithValue("Nombre", producto.Nombre);
                    sqlCmd.Parameters.AddWithValue("Valor", producto.Valor);
                    sqlCmd.Parameters.AddWithValue("Cantidad", producto.Cantidad);
                    sqlCmd.ExecuteNonQuery();
                }

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


        // GET: ProductoController/Delete/5
        [HttpDelete("{id}")]
        public ActionResult EliminarProducto(int id)
        {
            try
            {
                using (SqlConnection sqlconnection = new SqlConnection(_configuration.GetConnectionString("DALEAPI")))
                {
                    sqlconnection.Open();
                    SqlCommand sqlCmd = new SqlCommand("ProductoEliminar", sqlconnection);
                    sqlCmd.CommandType = CommandType.StoredProcedure;
                    sqlCmd.Parameters.AddWithValue("Id", id);
                    sqlCmd.ExecuteNonQuery();
                    return Ok();
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


    }
}
