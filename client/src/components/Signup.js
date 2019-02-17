import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      profession: '',
      Loggedin: false,
      Signedup: false
    }
  }
  
  componentDidMount() {
    // axios.get('/auth/checkLogging').
    // then((x) => {
    //   console.log('356', x);
    //   if (x.data) {
    //     console.log(this)
    //       this.setState({
    //         Loggedin: true
    //       })
    //   } else {
    //     this.setState({
    //       Loggedin: false
    //     })
    //   }
    // })
  }

  sweetAlert = (message) => {
    Swal.fire({
      title: 'Error!',
      text: message,
      type: 'error',
      confirmButtonText: 'Close'
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
    
  handleSubmit = (event) => {
    if (this.state.firstName === '') {
      this.sweetAlert('First name cannot be empty');
    } else if (this.state.lastName === '') {
      this.sweetAlert('Last name cannot be empty');
    } else if (this.state.email === '') {
      this.sweetAlert('Email cannot be empty');
    } else if (this.state.password === '') {
      this.sweetAlert('Password cannot be empty');
    } else if (this.state.profession === '') {
      this.sweetAlert('Profession cannot be empty');
    } else {
      event.preventDefault()
      const validate = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        profession: this.state.profession
      } 
  
      axios.post('/auth/signup', validate)
      .then(response => {
        if (response.data === 'exist') {
          this.sweetAlert('User already exist');
        }
        if (!response.data.error) {
          console.log('We are good')
          this.setState({
            Signedup: true
          })
        } else {
          console.log(response.data.error)
        }
      })
    }  
  }
        
  render(){
    const { classes } = this.props; 
    if (this.state.Loggedin) {
      return <Redirect to={{ pathname: '/HomePage', state: { referrer: this.state.email } }} />
    } else if (this.state.Signedup) {
      return <Redirect to={{ pathname: '/Upload', state: { referrer: this.state.email } }} />
    } else { 
      return (  
        <div>
          <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">First name</InputLabel>
                  <Input user="name" name="firstName" autoComplete="user" autoFocus onChange={this.handleChange} />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Last name</InputLabel>
                  <Input last="name" name="lastName" autoComplete="user"  onChange={this.handleChange} />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input id="email" name="email" autoComplete="email"   onChange={this.handleChange} />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange} />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <select onChange={this.handleChange} name="profession" >
                  <option disabled selected>Choose your profession</option>
                  <option>Doctor</option>
                  <option>Nurse</option>
                  <option>Pharmacist</option>
                  <option>Ray Technician</option>
                  </select>
                </FormControl>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.handleSubmit}
                >
                  Sign up
                </Button>
              </form>
              <Link to="/Signin"><button style={{'width': '350px', 'margin':'10px'}} className={'btn btn-danger'}>SIGN IN</button></Link>
            </Paper>
          </main>
        </div>
      )
    };
  }
}

export default withStyles(styles)(Signup);