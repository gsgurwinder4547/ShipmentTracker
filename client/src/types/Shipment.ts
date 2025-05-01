export interface Shipment {
  id?: number;
  origin: string;
  destination: string;
  status: string;
  carrier: string;
  shipDate: string;
  estimatedDeliveryDate: string;
}
 