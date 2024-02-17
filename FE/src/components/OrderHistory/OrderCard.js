// OrderCard.js
import React from 'react';
import useStyles from './styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const OrderCard = ({ order }) => {
  const classes = useStyles();
  const { id, image, description, status, orderNumber, reviewStars } = order;
  const slicedDescription = description.slice(0, 50);

  return (
    <Grid item xs={12} sm={6} md={12} lg={12} xl={12}>
      <Card className={classes.card}>
        <CardMedia
          component="img"
          alt={`Product ${id}`}
          height="100%"
          image={image}
          sx={{
            width: '250px',
            height: '250px',
            objectFit: 'cover',
          }}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="subtitle1" component="div" className={classes.description}>
            {slicedDescription}
          </Typography>
          <CardContent/>
        <div className={classes.statusAndOrder}>
          <Typography variant="body2" gutterBottom className={classes.status}>
            Status: {status}
          </Typography>
          <Typography variant="subtitle1" component="div" className={classes.reviews}>
            Review Stars: {reviewStars}
          </Typography>
          <Typography variant="body2" color="text.secondary" className={classes.orderNumber}>
            Order No: {orderNumber}
          </Typography>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default OrderCard;
