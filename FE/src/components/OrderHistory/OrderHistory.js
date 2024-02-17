import React, { useState, useEffect } from 'react';
import OrderCard from './OrderCard';
import {
  Typography,
  Grid,
  Container,
} from '@material-ui/core';
import { Pagination } from '@mui/material';
import Filters from './Filters';
import useStyles from './styles';

const OrderHistoryComponent = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [page, setPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/orders');
        const data = await response.json();

        if (response.ok) {
          setOrders(data.orders);
          setFilteredOrders(data.orders);
        } else {
          console.error('Error fetching orders:', data.error);
        }
      } catch (error) {
        console.error('Error fetching orders:', error.message);
      }
    };

    fetchOrders();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleFilterChange = (status) => {
    let filtered;
  
    if (typeof status === 'string') {
      filtered = orders.filter((order) =>
        order.status.toLowerCase().includes(status.toLowerCase()) ||
        (status.toLowerCase() === 'delivered' && order.status.toLowerCase() === 'pickupcomplete')
      );
    } else if (Array.isArray(status)) {
      filtered = orders.filter((order) =>
        status.some((s) => 
          order.status.toLowerCase().includes(s.toLowerCase()) ||
          (s.toLowerCase() === 'delivered' && order.status.toLowerCase() === 'pickupcomplete')
        )
      );
    } else {
      filtered = orders;
    }
  
    setFilteredOrders(filtered);
    console.log(filteredOrders)
    setPage(1);
  };
  

  const startIndex = (page - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;

  return (
    <Container>
      <Typography variant="h4" className={classes.header}>
        Order History
      </Typography>
      <Filters onFilterChange={handleFilterChange} />
      <Grid container spacing={3}>
        {filteredOrders.slice(startIndex, endIndex).map((order, id) => (
          <OrderCard key={id} order={order} />
        ))}
      </Grid>
      <div className={classes.pagination}>
        <Pagination
          count={Math.ceil(filteredOrders.length / ordersPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </Container>
  );
};

export default OrderHistoryComponent;
