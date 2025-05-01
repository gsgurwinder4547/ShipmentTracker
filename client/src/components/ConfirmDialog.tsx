import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function ConfirmDialog({ open, onClose, onConfirm }: Props) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to delete this shipment?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button color="error" onClick={onConfirm}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
} 
