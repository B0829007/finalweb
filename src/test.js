import React ,{ useState}from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Links from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import axios from  'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Links color="inherit" >
        Your Website
      </Links>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://i.imgur.com/Bfkrffp.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    margin: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  
}));

export default function SignInSide() {
  const classes = useStyles();
  const [statement , setStatement] = useState("0");
  const [user, setUser ] = useState("");
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  const  handleSubmit = (e) =>{
    e.preventDefault();
    console.log(user)
    console.log(values.password)
    let formData = new FormData()
    formData.append("user",user)
    formData.append("password",values.password)
    const url = "https://cors-anywhere.herokuapp.com/https://final-covid.herokuapp.com/login.php";
    axios.post(url,formData)
        .then(res=>console.log(res.data))
        .catch(err => console.log(err));
        if(statement == 1)
        {
          window.location.assign("Home.html");
        }
        else 
        {
          setStatement(1);
        }
      }
    
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box  boxShadow={3}
        bgcolor="#ffebee"
        m={1}
        p={1}
        style={{ width: '39rem', height: '30rem' }}
        position = 'right'
        marginTop='100px'>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <InfoOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={1} alignItems="flex-end">
          <Grid item xs={1}>
            <AccountCircle />
          </Grid>
          <Grid item xs={11}>
            <TextField 
              margin="normal"
              required
              fullWidth
              id="user" 
              label="user "
              name="user"
              type="user"
              onChange={(account) => setUser(account.target.value)}
              autoFocus
              />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormControl
            margin="normal"
            required
            fullWidth>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
            id="password"
            type={values.showPassword ? 'text' : 'password'}
            label="password"
            name="password"s
            onChange={handleChange('password')}
              endAdornment={
                <InputAdornment>
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          </Grid>  
            <FormControlLabel
              control={<GreenCheckbox value="remember"  />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={classes.submit}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs={7}>
                <Link exact to="/signup">
                <Links href="#" variant="body2">
                  Forgot password?
                </Links>
                </Link>
              </Grid>
              <Grid item >
              <Link exact to="/signup">
                <Links href="#" variant="body2">
                  {"Don't have an account?"}
                </Links>
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
             </Box>
          </form>
        </div>
        </Box>
      </Grid>
    </Grid>
  );
}