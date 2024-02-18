import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    margin: 'auto',
    maxWidth: 600,
  },
  image: {
    width: '100%',
    height: 'auto',
  },
}));

const OrderDetails = ({ orders }) => {
  const classes = useStyles();
  const { orderId } = useParams();

  const order = orders.find((order) => order.id.toString() === orderId);

  if (!order) {
    return <Typography variant="h6">Order not found</Typography>;
  }

  const { id, image, description, status, orderNumber, reviewStars } = order;

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" gutterBottom>
        Order Details - {orderNumber}
      </Typography>
      <img src={image} alt={`Product ${id}`} className={classes.image} />
      <Typography variant="h6" gutterBottom>
        Description: {description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Status: {status}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Order Number: {orderNumber}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Review Stars: {reviewStars}
      </Typography>
    </Paper>
  );
};

export default OrderDetails;
