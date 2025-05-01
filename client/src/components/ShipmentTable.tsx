import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TablePagination, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

import { getShipments, deleteShipment } from '@/api/shipmentApi';
import { Shipment } from '@/types/Shipment';
import ShipmentFormDialog from './ShipmentFormDialog';
import ConfirmDialog from './ConfirmDialog';

export default function ShipmentTable() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [carrierFilter, setCarrierFilter] = useState('');

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const loadShipments = async () => {
    const response = await getShipments({
      status: statusFilter || undefined,
      carrier: carrierFilter || undefined
    });
    setShipments(response.data);
  };

  useEffect(() => {
    loadShipments();
  }, [statusFilter, carrierFilter]);

  const handleEdit = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setOpenForm(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setOpenConfirm(true);
  };

  const confirmDelete = async () => {
    if (deleteId !== null) {
      await deleteShipment(deleteId);
      loadShipments();
      setOpenConfirm(false);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  return (
    <div>
      <Button variant="contained" onClick={() => { setSelectedShipment(null); setOpenForm(true); }}>
        Add Shipment
      </Button> 
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Transit">In Transit</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Carrier</InputLabel>
          <Select value={carrierFilter} label="Carrier" onChange={(e) => setCarrierFilter(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="FedEx">FedEx</MenuItem>
            <MenuItem value="UPS">UPS</MenuItem>
            <MenuItem value="DHL">DHL</MenuItem>
            <MenuItem value="Canada Post">Canada Post</MenuItem>
          </Select>
        </FormControl>
      </div>
      <ShipmentFormDialog
        open={openForm}
        handleClose={() => { setOpenForm(false); loadShipments(); }}
        shipment={selectedShipment}
      />
      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={confirmDelete}
      />

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Carrier</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ship Date</TableCell>
              <TableCell>ETA</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.origin}</TableCell>
                <TableCell>{s.destination}</TableCell>
                <TableCell>{s.carrier}</TableCell>
                <TableCell>{s.status}</TableCell>
                <TableCell>{new Date(s.shipDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(s.estimatedDeliveryDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(s)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(s.id!)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Control */}
        <TablePagination
          component="div"
          count={shipments.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </TableContainer>
    </div>
  );
}
 