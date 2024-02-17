// styles.js
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  media: {
    width: '250px',
    height: '250px',
    objectFit: 'cover',
  },
  content: {
    marginLeft: theme.spacing(2), 
  },
  description: {
    marginBottom: theme.spacing(1),
  },
  statusAndOrder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  status: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  reviews: {
    alignSelf: 'flex-end',
  },
  orderNumber: {
    alignSelf: 'flex-end',
  },
}));

export default useStyles;
