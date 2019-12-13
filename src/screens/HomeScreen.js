import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import LoginScreenClass from './LoginScreenClass';
import BackButton from '../components/BackButton';
import { RegisterScreen } from '.';
import axios from 'axios';


class HomeScreen extends React.Component {

  constructor() {
    super() 

    this.state = {
      toggle: "one",
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      userName: "Please Login",
      userLoggedIn: false
    }

    // this.handleSubmit = this.handleSubmit.bind(this)
    this.logIn = this.logIn.bind(this)
    this.home = this.home.bind(this)
    this.signUp = this.signUp.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.checkLoginStatus = this.checkLoginStatus.bind(this)
  }

  componentDidMount() {
    this.checkLoginStatus()
    this.setState({
      toggle: "one"
    });
  }

  handleLogout(){
    axios.delete("https://powerful-sea-75935.herokuapp.com/api/v1/logout", {withCredentials: true}).then(response => {
      this.setState ({
        loggedInStatus: "NOT_LOGGED_IN",
        user: {},
        userName: ""
      })
    })
    .catch(error => {
        console.log("Logout Error ", error)
      })  
  }

  justLoggedIn() {
    console.log("yooooooooooooo")
    this.checkLoginStatus()
  }


  checkLoginStatus() {
    const { navigation } = this.props;
    axios.get("https://powerful-sea-75935.herokuapp.com/api/v1/logged_in", {withCredentials: true})
    .then(response => {
      if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: response.data.user,
          userName: "Hey " + response.data.user.firstname,
          userLoggedIn: true
        })
        navigation.navigate('Dashboard', {
          user: response.data.user,
          loggedInStatus: "LOGGED_IN"
        });
      } 
      else if (!response.data.logged_in & this.state.loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        })
      }
    })
    .catch(error => {
      console.log("Login Error ", error)
    })
  }


  home() {
    this.setState({
      toggle: "one"
    });
  }

  logIn() {
    this.setState({
      toggle: "two"
    });
  };

  signUp() {
    this.setState({
      toggle: "three"
    });
  };

  
  render() {
    console.log("debugger")
    
    const { navigation } = this.props;


    if (this.state.toggle === "one") {
     return (
      <Background>
      
        <Logo />
        <Header>Login Template</Header>
        <Paragraph>
          Logged In Status: {this.state.loggedInStatus}
        </Paragraph>
        <Paragraph>
          User Logged In: {this.state.user.firstname}
        </Paragraph>
        <Button 
          mode="contained" 
          onPress={this.logIn}>
          LOGIN
        </Button>
        
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('RegisterScreen', {
            userLoggedIn: (e) => this.userLoggedIn(e)
          })}
        >
          Sign Up
        </Button>

        <Button 
          mode="contained" 
          onPress={this.handleLogout}>
          LOGOUT
        </Button>
      </Background>
    )
  }
  else if(this.state.toggle === "two") { 
    return (
      <LoginScreenClass 
        home={this.home}
        checkLoginStatus={this.checkLoginStatus}
        user={this.state.user}
        loggedInStatus={this.state.loggedInStatus}
        navigation={this.props.navigation}
        />
    )
  }

  else if(this.state.toggle === "three") { 
    return (
      <RegisterScreen home={this.home}/>
    )
  }

  }
}

export default HomeScreen;




















// import React, { memo } from 'react';
// import Background from '../components/Background';
// import Logo from '../components/Logo';
// import Header from '../components/Header';
// import Button from '../components/Button';
// import Paragraph from '../components/Paragraph';


// class HomeScreen extends React.Component {

//   constructor() {
//     super() 
//     this.state = {
//       loggedInStatus: "NOT_LOGGED_IN",
//       user: {},
//       userName: "Please Login",
//       userLoggedIn: false
//     }

//     this.handleSubmit = this.handleSubmit.bind(this)
//   }



  
//   render() {
    
//     const { navigation } = this.props;

//     return(
//       <Background>
//         <Logo />
//         <Header>Login Template</Header>

//         <Paragraph>
//           The easiest way to start with your amazing application.
//         </Paragraph>
//         <Button 
//           mode="contained" 
//           onPress={() => navigation.navigate('LoginScreenClass', {
//           handleSubmit: (e) => this.handleSubmit(e)
//           })}

//           >
//           Login
//         </Button>
//         <Button
//           mode="outlined"
//           onPress={() => navigation.navigate('RegisterScreen', {
//             userLoggedIn: (e) => this.userLoggedIn(e)
//           })}
//         >
//           Sign Up
//         </Button>
//       </Background>
//     )

//   }
// }

// export default HomeScreen;
