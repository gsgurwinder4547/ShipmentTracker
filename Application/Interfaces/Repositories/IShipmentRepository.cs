using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;

namespace Application.Interfaces.Repositories
{
    public interface IShipmentRepository
    {
        Task<IEnumerable<Shipment>> GetAllAsync(string? status, string? carrier);
        Task<Shipment> GetByIdAsync(int id);
        Task<Shipment> CreateAsync(Shipment shipment);
        Task UpdateAsync(Shipment shipment);
        Task DeleteAsync(int id);
    }
}