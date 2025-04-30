using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Application.Interfaces.Services;
using Domain.Entities;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShipmentsController : ControllerBase
    {
        private readonly IShipmentService _shipmentService;

        public ShipmentsController(IShipmentService shipmentService)
        {
            _shipmentService = shipmentService;
        }

       [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? status, [FromQuery] string? carrier)
        {
            try
            {
                var shipments = await _shipmentService.GetAllAsync(status, carrier);
                return Ok(shipments);
            }
            catch (Exception ex)
            {
                // Log the error
                Console.WriteLine("Error fetching shipments: " + ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Shipment>> GetById(int id)
        {
            var shipment = await _shipmentService.GetByIdAsync(id);
            if (shipment == null)
                return NotFound();

            return shipment;
        }

        [HttpPost]
        public async Task<ActionResult<Shipment>> Create(Shipment shipment)
        {
            var created = await _shipmentService.CreateAsync(shipment);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Shipment shipment)
        {
            if (id != shipment.Id)
                return BadRequest();

            await _shipmentService.UpdateAsync(shipment);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _shipmentService.DeleteAsync(id);
            return NoContent();
        }
    }
}