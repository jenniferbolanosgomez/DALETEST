using DALEAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Data;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DALEAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : Controller
    {
        private readonly IConfiguration _configuration;

        public ClienteController(IConfiguration configuration)
        {

            this._configuration = configuration;
        }

        // GET: api/<ClienteController>
        [HttpGet]
        public ActionResult ObtenerClientes()
        {
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection sqlconnection = new SqlConnection(_configuration.GetConnectionString("DALEAPI")))
                {
                    sqlconnection.Open();
                    SqlDataAdapter sqlDA = new SqlDataAdapter("ClienteConsultar", sqlconnection);
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

        // GET api/<ClienteController>/5
        [HttpGet("{id}")]
        public ActionResult ObtenerClientexId(int id)
        {
            Cliente cliente = new Cliente();
            try
            {
                using (SqlConnection sqlconnection = new SqlConnection(_configuration.GetConnectionString("DALEAPI")))
                {
                    DataTable dt = new DataTable();
                    sqlconnection.Open();
                    SqlDataAdapter sqlDA = new SqlDataAdapter("ClienteConsultarId", sqlconnection);
                    sqlDA.SelectCommand.CommandType = CommandType.StoredProcedure;
                    sqlDA.SelectCommand.Parameters.AddWithValue("Id", id);
                    sqlDA.Fill(dt);
                    if (dt.Rows.Count == 1)
                    {
                        cliente.Id = Convert.ToInt32(dt.Rows[0]["Id"].ToString());
                        cliente.Cedula = dt.Rows[0]["Cedula"].ToString();
                        cliente.Nombre = dt.Rows[0]["Nombre"].ToString();
                        cliente.Apellido = dt.Rows[0]["Apellido"].ToString();
                        cliente.Telefono = dt.Rows[0]["Telefono"].ToString();
                    }
                    return Ok(cliente);
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // GET api/<ClienteController>/5
        [HttpGet] 
        [Route(("clientecedula/{cedula:long:min(1)}"))]
        public ActionResult ObtenerClientexCedula(string cedula)
        {
            Cliente cliente = new Cliente();
            try
            {
                using (SqlConnection sqlconnection = new SqlConnection(_configuration.GetConnectionString("DALEAPI")))
                {
                    DataTable dt = new DataTable();
                    sqlconnection.Open();
                    SqlDataAdapter sqlDA = new SqlDataAdapter("ClienteConsultarxCedula", sqlconnection);
                    sqlDA.SelectCommand.CommandType = CommandType.StoredProcedure;
                    sqlDA.SelectCommand.Parameters.AddWithValue("Cedula", cedula);
                    sqlDA.Fill(dt);
                    if (dt.Rows.Count == 1)
                    {
                        cliente.Id = Convert.ToInt32(dt.Rows[0]["Id"].ToString());
                        cliente.Cedula = dt.Rows[0]["Cedula"].ToString();
                        cliente.Nombre = dt.Rows[0]["Nombre"].ToString();
                        cliente.Apellido = dt.Rows[0]["Apellido"].ToString();
                        cliente.Telefono = dt.Rows[0]["Telefono"].ToString();
                    }
                    return Ok(cliente);
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // POST api/<ClienteController>
        [HttpPost]
        public ActionResult AgregarCliente([FromBody] Cliente cliente)
        {
            try
            {
                using (SqlConnection sqlconnection = new SqlConnection(_configuration.GetConnectionString("DALEAPI")))
                {
                    sqlconnection.Open();
                    SqlCommand sqlCmd = new SqlCommand("ClienteCrear", sqlconnection);
                    sqlCmd.CommandType = CommandType.StoredProcedure;
                    sqlCmd.Parameters.AddWithValue("Cedula", cliente.Cedula);
                    sqlCmd.Parameters.AddWithValue("Nombre", cliente.Nombre);
                    sqlCmd.Parameters.AddWithValue("Apellido", cliente.Apellido);
                    sqlCmd.Parameters.AddWithValue("Telefono", cliente.Telefono);
                    sqlCmd.ExecuteNonQuery();
                }
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT api/<ClienteController>/5
        [HttpPut("{id}")]
        public ActionResult ActualizarCliente(int id, [FromBody] Cliente cliente)
        {
            try
            {

                using (SqlConnection sqlconnection = new SqlConnection(_configuration.GetConnectionString("DALEAPI")))
                {
                    sqlconnection.Open();
                    SqlCommand sqlCmd = new SqlCommand("ClienteModificar", sqlconnection);
                    sqlCmd.CommandType = CommandType.StoredProcedure;
                    sqlCmd.Parameters.AddWithValue("Id", id);
                    sqlCmd.Parameters.AddWithValue("Cedula", cliente.Cedula);
                    sqlCmd.Parameters.AddWithValue("Nombre", cliente.Nombre);
                    sqlCmd.Parameters.AddWithValue("Apellido", cliente.Apellido);
                    sqlCmd.Parameters.AddWithValue("Telefono", cliente.Telefono);
                    sqlCmd.ExecuteNonQuery();
                }

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // DELETE api/<ClienteController>/5
        [HttpDelete("{id}")]
        public ActionResult EliminarCliente(int id)
        {
            try
            {
                using (SqlConnection sqlconnection = new SqlConnection(_configuration.GetConnectionString("DALEAPI")))
                {
                    sqlconnection.Open();
                    SqlCommand sqlCmd = new SqlCommand("ClienteEliminar", sqlconnection);
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
