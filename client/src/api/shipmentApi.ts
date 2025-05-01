import axios from 'axios';
import { Shipment } from '@/types/Shipment';

const api = axios.create({
    baseURL: 'https://localhost:5001/api'
});

export const getShipments = (filters?: { status?: string; carrier?: string }) => {
    const params = new URLSearchParams();
  
    if (filters?.status) params.append('status', filters.status);
    if (filters?.carrier) params.append('carrier', filters.carrier);
  
    return api.get<Shipment[]>(`/shipments?${params.toString()}`);
};
export const createShipment = (shipment: Shipment) => api.post('/shipments', shipment);
export const updateShipment = (id: number, shipment: Shipment) => api.put(`/shipments/${id}`, shipment);
export const deleteShipment = (id: number) => api.delete(`/shipments/${id}`);

export default api; 
