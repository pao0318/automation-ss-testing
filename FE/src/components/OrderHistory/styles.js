import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    borderRadius: theme.shape.borderRadius,
    position: 'relative'
  },
  mediaWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: theme.spacing(2),
  },
  media: {
    width: 160,
    height: 160,
    objectFit: 'cover',
    marginBottom: theme.spacing(1),
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  topContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(6),
  },
  bottomContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    marginRight: theme.spacing(2),
    fontSize: '2.075rem',

  },
  status: {
    fontSize: '2.075rem',
    position: 'absolute',
    top:'50%',
    bottom: '50%',
    left:'50%',
    right:'50%',
    fontWeight: 'bold',
  },
  reviewSection: {
    alignSelf: 'center',
    marginTop: theme.spacing(1),
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    // Button styling here
  },
  viewDetailsLink: {
    fontWeight: 'bold', // Makes the font bold
    color: theme.palette.primary.main, // Sets the color to the primary color of the theme
    textDecoration: 'none', // Removes the underline from the link
    '&:hover': {
      textDecoration: 'underline', // Adds underline on hover for better UX
    },
    // Additional styling if needed
  },
  button: {
    margin: '8px',
    width:'auto',
    // Additional button styling here
  },
  // ...additional styles
}));

export default useStyles;