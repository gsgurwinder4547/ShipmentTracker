import { Container, Typography } from '@mui/material';
import ShipmentTable from '@/components/ShipmentTable';

export default function HomePage() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>Shipment Tracker</Typography>
            <ShipmentTable />
        </Container>
    );
}
 