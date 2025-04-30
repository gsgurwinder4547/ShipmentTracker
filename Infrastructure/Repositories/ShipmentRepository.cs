using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Application.Interfaces.Repositories;

namespace Infrastructure.Repositories
{
    public class ShipmentRepository : IShipmentRepository
    {
        private readonly ApplicationDbContext _context;

        public ShipmentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Shipment> CreateAsync(Shipment shipment)
        {
            _context.Shipments.Add(shipment);
            await _context.SaveChangesAsync();
            return shipment;
        }

        public async Task DeleteAsync(int id)
        {
            var shipment = await _context.Shipments.FindAsync(id);
            if (shipment != null)
            {
                _context.Shipments.Remove(shipment);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Shipment>> GetAllAsync(string? status, string? carrier)
        {
            var query = _context.Shipments.AsQueryable();

            if (!string.IsNullOrEmpty(status))
                query = query.Where(s => s.Status == status);

            if (!string.IsNullOrEmpty(carrier))
                query = query.Where(s => s.Carrier == carrier);

            return await query.ToListAsync();
        }

        public async Task<Shipment> GetByIdAsync(int id)
        {
            return await _context.Shipments.FindAsync(id);
        }

        public async Task UpdateAsync(Shipment shipment)
        {
            _context.Entry(shipment).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}