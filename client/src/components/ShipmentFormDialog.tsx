import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import { Shipment } from '@/types/Shipment';
import { createShipment, updateShipment } from '@/api/shipmentApi';

interface Props {
    open: boolean;
    handleClose: () => void;
    shipment: Shipment | null;
}

export default function ShipmentFormDialog({ open, handleClose, shipment }: Props) {
    const shipmentStatuses = ['Pending', 'In Transit', 'Delivered', 'Cancelled'];
    const shipmentCarriers = ['FedEx', 'UPS', 'DHL', 'Canada Post'];

    const [formData, setFormData] = useState<Shipment>({
        origin: '',
        destination: '',
        carrier: '',
        status: '',
        shipDate: '',
        estimatedDeliveryDate: ''
    });

    useEffect(() => {
        if (shipment) {
            setFormData({
                ...shipment,
                shipDate: shipment.shipDate?.split('T')[0] || '',
                estimatedDeliveryDate: shipment.estimatedDeliveryDate?.split('T')[0] || ''
            });
          } else {
            setFormData({
              origin: '',
              destination: '',
              carrier: '',
              status: 'Pending', 
              shipDate: 'FedEx',
              estimatedDeliveryDate: ''
            });
          }
        }, [shipment]);        

    const handleSubmit = async () => {
        console.log("Submitting:", formData); 
        
        if (shipment?.id) {
            await updateShipment(shipment.id, formData);
        } else {
            await createShipment(formData); 
        }        
        handleClose();
        };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{shipment ? "Edit Shipment" : "Add Shipment"}</DialogTitle>
            <DialogContent>
                <TextField fullWidth margin="dense" label="Origin" value={formData.origin} onChange={(e) => setFormData({ ...formData, origin: e.target.value })} />
                <TextField fullWidth margin="dense" label="Destination" value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} />
                <FormControl fullWidth margin="dense">
                    <InputLabel id="status-label">Carrier</InputLabel>
                    <Select labelId="status-label" id="carrier" value={formData.carrier} label="Carrier" onChange={(e) => setFormData({ ...formData, carrier: e.target.value })}>
                        {shipmentCarriers.map((carrier) => (
                        <MenuItem key={carrier} value={carrier}>
                            {carrier}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select labelId="status-label" id="status" value={formData.status} label="Status" onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                        {shipmentStatuses.map((status) => (
                        <MenuItem key={status} value={status}>
                            {status}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField fullWidth margin="dense" type="date" label="Ship Date" value={formData.shipDate} onChange={(e) => setFormData({ ...formData, shipDate: e.target.value })} InputLabelProps={{ shrink: true }}/>
                <TextField fullWidth margin="dense" type="date" label="ETA" value={formData.estimatedDeliveryDate} onChange={(e) => setFormData({ ...formData, estimatedDeliveryDate: e.target.value })} InputLabelProps={{ shrink: true }}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
} 
