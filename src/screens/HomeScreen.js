import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import LoginScreenClass from './LoginScreenClass';
import HomeBackground from '../components/HomeBackground';
import HomeMenuHeader from '../components/HomeMenuHeader';
import Button from '../components/Button';
import { SafeAreaView } from 'react-navigation';
import { RegisterScreen } from '.';
import axios from 'axios';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import BackButton from '../components/BackButton';



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
    console.disableYellowBox = true
    const { navigation } = this.props;


    if (this.state.toggle === "one") {
     return (
      <HomeBackground >
        <HomeMenuHeader />
        <View style={styles.viewContainer}>
          <View style={styles.buttonContainer}> 
            <Button 
              mode="outlined"
              style={styles.button} 
              onPress={this.logIn}>
              LOGIN
            </Button>
          </View>

          <View style={styles.buttonContainer}> 
            <Button 
              mode="contained"
              style={styles.button} 
              onPress={this.signUp}>
              SignUp
            </Button>
          </View>
          
          {/* <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              style={styles.button} 
              onPress={() => navigation.navigate('RegisterScreen', { userLoggedIn: (e) => this.userLoggedIn(e) })}
              > Sign Up           
          </Button>
        </View> */}

        </View>
      </HomeBackground>

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


const styles = StyleSheet.create({
  viewContainer: {
    marginTop:'70%',
    flex: 0,
    padding: 0,
    width: '100%',
    // maxWidth: 340,
    // // alignSelf: 'center',
    // // alignItems: 'center',
    // // justifyContent: 'center',
  },

  buttonContainer: {
    marginBottom:30,
    flex: 0,
    height:60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    width: '70%',
    alignItems: 'stretch',
    height:60,
    // borderColor: '#CFCDD7',
    // borderWidth: 1,
  },

})



















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
