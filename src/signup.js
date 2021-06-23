import React,{ useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Links from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom';
import axios from  'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Links color="inherit" href="https://b0829007.github.io/webdesign/">
        Your Website
      </Links>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [user, setUser ] = useState("");
  const [email, setEmail ] = useState("");
  const [password, setPassword ] = useState("");
  const [passwordagain, setPasswordAgain ] = useState("");

  const  handleSubmit = (e) =>{
    e.preventDefault();
    console.log(user)
    console.log(email)
    console.log(password)
    console.log(passwordagain)
    let formData = new FormData()
    formData.append("User",user)
    formData.append("Email",email)
    formData.append("password",password)
    formData.append("password-again",passwordagain)
    // const url = "https://cors-anywhere.herokuapp.com/https://final-covid.herokuapp.com/register.php";
    const url = "http://localhost/final-covid/register.php";
    axios.post(url,formData)
        .then(res=>{
          if(res.data=="Accept")
        {
          alert("Success")
        }
        else if(res.data=="Fail"){
          alert("Fail")
        }
        else if(res.data=="Change"){
          alert("Already Exist")
        }
          console.log(res.data)})
        .catch(err => console.log(err));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="User Name"
                name="User Name"
                variant="outlined"
                required
                fullWidth
                id="User Name"
                label="User Name"
                type="User Name"
                autoFocus
                onChange={(account) => setUser(account.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="Email"
                name="Email"
                variant="outlined"
                required
                fullWidth
                id="Email"
                label="Email"
                type="Email"

                onChange={(account) => setEmail(account.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(account) => setPassword(account.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="password-again"
                name="password-again"
                variant="outlined"
                required
                fullWidth
                id="password-again"
                label="Password Again"
                type="password"
                onChange={(account) => setPasswordAgain(account.target.value)}
              />
            </Grid>
          </Grid>
          <Link exact to="/">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.submit}
          >
            Sign Up
          </Button>
          </Link>
          <Grid container justify="flex-end">
            <Grid item>
            <Link exact to="/">
              <Links href="#" variant="body2">
                Already have an account? Sign in
              </Links>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}