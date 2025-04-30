using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Shipment
    {
        public int Id { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public string Carrier { get; set; }
        public string Status { get; set; }
        public DateTime ShipDate { get; set; }
        public DateTime EstimatedDeliveryDate { get; set; }
    }
}