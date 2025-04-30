using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;

namespace Application.Interfaces.Services
{
    public interface IShipmentService
    {
        Task<IEnumerable<Shipment>> GetAllAsync(string? status, string? carrier);
        Task<Shipment> GetByIdAsync(int id);
        Task<Shipment> CreateAsync(Shipment shipment);
        Task UpdateAsync(Shipment shipment);
        Task DeleteAsync(int id);
    }
}