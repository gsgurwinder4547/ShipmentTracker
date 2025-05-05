import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from '@mui/material';
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
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [errors, setErrors] = useState<Partial<Record<keyof Shipment, string>>>({});

    const [formData, setFormData] = useState<Shipment>({
        origin: '',
        destination: '',
        carrier: '',
        status: '',
        shipDate: '',
        estimatedDeliveryDate: ''
    });

    useEffect(() => {
        if (open) {
            setErrors({});
            setShowSnackbar(false);
            setSnackbarMessage("");
          }

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
              status: '', 
              shipDate: '',
              estimatedDeliveryDate: ''
            });
          }
        }, [shipment, open]);

    const validate = () => {
        const newErrors: Partial<Record<keyof Shipment, string>> = {};
    
        if (!formData.origin.trim()) newErrors.origin = "Origin is required.";
        if (!formData.destination.trim()) newErrors.destination = "Destination is required.";
        if (!formData.carrier.trim()) newErrors.carrier = "Carrier is required.";
        if (!formData.status.trim()) newErrors.status = "Status is required.";
        if (!formData.shipDate.trim()) newErrors.shipDate = "Ship Date is required.";
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
          if (shipment?.id) {
            await updateShipment(shipment.id, formData);
            setSnackbarMessage("Shipment updated successfully.");
          } else {
            await createShipment(formData);
            setSnackbarMessage("Shipment created successfully.");
          }
      
          setShowSnackbar(true);
      
          setTimeout(() => {
            handleClose();
          }, 2000);
        } catch (error) {
          setSnackbarMessage("Error saving shipment. Please try again.");
          setShowSnackbar(true);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{shipment ? "Edit Shipment" : "Add Shipment"}</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    margin="dense"
                    label="Origin"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    error={!!errors.origin}
                    helperText={errors.origin}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Destination"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    error={!!errors.destination}
                    helperText={errors.destination}
                />
                <FormControl fullWidth margin="dense" error={!!errors.carrier}>
                    <InputLabel id="carrier-label">Carrier</InputLabel>
                    <Select
                        labelId="carrier-label"
                        value={formData.carrier}
                        label="Carrier"
                        onChange={(e) => setFormData({ ...formData, carrier: e.target.value })}
                    >
                        {shipmentCarriers.map((carrier) => (
                            <MenuItem key={carrier} value={carrier}>
                                {carrier}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.carrier && <p style={{ color: 'red', margin: '3px 0 0 14px' }}>{errors.carrier}</p>}
                </FormControl>
                <FormControl fullWidth margin="dense" error={!!errors.status}>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                        labelId="status-label"
                        value={formData.status}
                        label="Status"
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                        {shipmentStatuses.map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.status && <p style={{ color: 'red', margin: '3px 0 0 14px' }}>{errors.status}</p>}
                </FormControl>
                <TextField 
                    fullWidth 
                    margin="dense" 
                    type="date" 
                    label="Ship Date" 
                    value={formData.shipDate} 
                    onChange={(e) => setFormData({ ...formData, 
                    shipDate: e.target.value })} 
                    InputLabelProps={{ shrink: true }}
                />
                <TextField 
                    fullWidth 
                    margin="dense" 
                    type="date" 
                    label="ETA" 
                    value={formData.estimatedDeliveryDate} 
                    onChange={(e) => setFormData({ ...formData, 
                    estimatedDeliveryDate: e.target.value })} 
                    InputLabelProps={{ shrink: true }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Save</Button>
            </DialogActions>
            
            <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" onClose={() => setShowSnackbar(false)} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Dialog>
    );
} 
