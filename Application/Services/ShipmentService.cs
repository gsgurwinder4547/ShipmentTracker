using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.Entities;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;

namespace Application.Services
{
    public class ShipmentService: IShipmentService
    {
        private readonly IShipmentRepository _repository;

        public ShipmentService(IShipmentRepository repository)
        {
            _repository = repository;
        }

        public async Task<Shipment> CreateAsync(Shipment shipment) => await _repository.CreateAsync(shipment);
        public async Task DeleteAsync(int id) => await _repository.DeleteAsync(id);
        public async Task<IEnumerable<Shipment>> GetAllAsync(string? status, string? carrier) {
            return await _repository.GetAllAsync(status, carrier);
        }
        public async Task<Shipment> GetByIdAsync(int id) => await _repository.GetByIdAsync(id);
        public async Task UpdateAsync(Shipment shipment) => await _repository.UpdateAsync(shipment);
    }
}