// OrderCard.js
import React from 'react';
import useStyles from './styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const buttonStyle = {
  margin: '8px',
  width: 'auto',
}
const statusStyle = {
  fontSize: '2.0rem',
  position: 'absolute',
  top:'50%',
  bottom: '50%',
  left:'50%',
  right:'50%',
  fontWeight: 'bold',
  whiteSpace: 'nowrap', 
  textOverflow: 'ellipsis',
};

const OrderCard = ({ order }) => {
  const classes = useStyles();
  const { id, image, description, status, orderNumber, reviewStars } = order;
  const slicedDescription = description.slice(0, 50);

  return (
    <Grid item xs={12} sm={6} md={12} lg={12} xl={12}>
      <Card className={classes.card}>
        <div className={classes.mediaWrapper}>
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
        <Typography variant="subtitle1" component="div" className={classes.reviews}>
            Review Stars: {reviewStars}
          </Typography>
        </div>
        <div className={classes.content}>
        <div className={classes.topContent}>
        <Typography gutterBottom variant="subtitle1" component="div" className={classes.description}>
            {slicedDescription}
          </Typography>
          <Link to={`/order-details/${id}`} className={classes.viewDetailsLink}>
            View Details &gt;
          </Link>
          </div>
          <div className={classes.bottomContent}>
          <Typography style= {statusStyle} variant="body1">
            {status}
          </Typography>
          <Typography variant="caption" className={classes.orderNumber}>
            Order No: {orderNumber}
          </Typography>
          <div className={classes.actions} >
          
            <Button style={buttonStyle} variant="contained" color="primary" className={classes.button}>
              Track Package
            </Button>
            <Button style={buttonStyle} variant="contained" className={classes.button}>
              Buy it Again
            </Button>
          </div>
        </div>
      </div>
    </Card>
     </Grid>
  );
};

export default OrderCard;
