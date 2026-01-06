import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Chip, Link } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'paid':
    case 'completed':
      return '#4CAF50';
    case 'pending':
      return '#FF9800';
    case 'shipped':
      return '#2196F3';
    default:
      return '#666';
  }
};
// const orders = [
//   {
//     product: { name: 'Grey TShirt', image: 'https://via.placeholder.com/40x40/808080/FFFFFF?text=TS' },
//     customer: 'Teena Ross',
//     date: 'Oct 24',
//     status: 'Paid',
//     statusColor: '#4CAF50',
//     amount: '$45.00',
//   },
//   {
//     product: { name: 'Coffee Mug', image: 'https://via.placeholder.com/40x40/8B4513/FFFFFF?text=CM' },
//     customer: 'Emily Mike',
//     date: 'Oct 23',
//     status: 'Pending',
//     statusColor: '#FF9800',
//     amount: '$28.50',
//   },
//   {
//     product: { name: 'Black Tote Bag', image: 'https://via.placeholder.com/40x40/000000/FFFFFF?text=TB' },
//     customer: 'John Doe',
//     date: 'Oct 23',
//     status: 'Shipped',
//     statusColor: '#2196F3',
//     amount: '$18.00',
//   },
//   {
//     product: { name: 'Black Cap', image: 'https://via.placeholder.com/40x40/000000/FFFFFF?text=BC' },
//     customer: 'Kiran S',
//     date: 'Oct 22',
//     status: 'Paid',
//     statusColor: '#4CAF50',
//     amount: '$15.00',
//   },
//   {
//     product: { name: 'Black Tote Bag', image: 'https://via.placeholder.com/40x40/000000/FFFFFF?text=TB' },
//     customer: 'Neena M',
//     date: 'Oct 27',
//     status: 'Shipped',
//     statusColor: '#2196F3',
//     amount: '$18.00',
//   },
//   {
//     product: { name: 'Black Cap', image: 'https://via.placeholder.com/40x40/000000/FFFFFF?text=BC' },
//     customer: 'Aishwaraya C',
//     date: 'Oct 30',
//     status: 'Shipped',
//     statusColor: '#2196F3',
//     amount: '$15.00',
//   },
// ];

export default function RecentOrders( {orders = [] }) {
  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        p: 3,
        boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #F0F0F0',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography
          sx={{
            fontFamily: "'Playfair Display'",
            fontSize: { xs: 20, md: 24 },
            fontWeight: 700,
            color: '#3B2A1A',
          }}
        >
          Recent Orders
        </Typography>
        <Link
          href="#"
          sx={{
            fontSize: 14,
            color: '#3B2A1A',
            textDecoration: 'none',
            fontWeight: 600,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          View All
        </Link>
      </Box>

      <TableContainer sx={{ flex: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: '#666', fontSize: 12, textTransform: 'uppercase', borderBottom: '1px solid #F0F0F0' }}>
                PRODUCT
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#666', fontSize: 12, textTransform: 'uppercase', borderBottom: '1px solid #F0F0F0' }}>
                CUSTOMER
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#666', fontSize: 12, textTransform: 'uppercase', borderBottom: '1px solid #F0F0F0' }}>
                DATE
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#666', fontSize: 12, textTransform: 'uppercase', borderBottom: '1px solid #F0F0F0' }}>
                STATUS
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#666', fontSize: 12, textTransform: 'uppercase', borderBottom: '1px solid #F0F0F0', textAlign: 'right' }}>
                AMOUNT
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {orders.length > 0 ? (
              orders.map((order, index) => {
              // Format date
              const orderDate = new Date(order.createdAt);
              const formattedDate = orderDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              
              // Get first product from order items
              const firstItem = order.items[0];
              const productName = firstItem?.productId?.name || 'Product';
              const productImage = firstItem?.productId?.design || 'https://via.placeholder.com/40x40';
              
              return (
                <TableRow key={order._id || index} sx={{ '&:hover': { backgroundColor: '#FAFAFA' } }}>
                  <TableCell sx={{ borderBottom: '1px solid #F0F0F0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar
                        src={productImage}
                        alt={productName}
                        sx={{ width: 40, height: 40, borderRadius: '8px' }}
                      />
                      <Typography sx={{ fontSize: 14, color: '#3B2A1A', fontWeight: 500 }}>
                        {productName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #F0F0F0' }}>
                    <Typography sx={{ fontSize: 14, color: '#666' }}>{order.customer || 'Guest'}</Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #F0F0F0' }}>
                    <Typography sx={{ fontSize: 14, color: '#666' }}>{formattedDate}</Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #F0F0F0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <FiberManualRecordIcon sx={{ fontSize: 8, color: getStatusColor(order.orderStatus) }} />
                      <Typography sx={{ fontSize: 14, color: '#666' }}>{order.orderStatus || 'Pending'}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #F0F0F0', textAlign: 'right' }}>
                    <Typography sx={{ fontSize: 14, color: '#3B2A1A', fontWeight: 600 }}>
                      ${order.totalAmount?.toFixed(2) || '0.00'}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} sx={{ textAlign: 'center', py: 4, color: '#666' }}>
                No orders yet
              </TableCell>
            </TableRow>
          )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}



