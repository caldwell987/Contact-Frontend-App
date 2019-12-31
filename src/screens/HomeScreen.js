import React, { memo } from 'react';
import WhiteLogo from '../components/WhiteLogo';
import { StyleSheet, View, Text } from 'react-native';
import LoginScreenClass from './LoginScreenClass';
import HomeBackground from '../components/HomeBackground';
import Button from '../components/Button';
import { SafeAreaView } from 'react-navigation';
import { RegisterScreen } from '.';
import axios from 'axios';
import Icon from "react-native-vector-icons/FontAwesome";




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
        {/* <HomeMenuHeader /> */}
        <View style={styles.viewContainer}>
          <View style={styles.logoView}>
            <WhiteLogo />
            <Text style={styles.headerText} > Contact Card </Text>
            <Text style={styles.sText} > Stay Connected </Text>
          </View>
          {/* <View style={styles.buttonContainer}>  */}
          {/* <WhiteLogo /> */}
            {/* <Button 
              // mode="outlined"
              style={styles.button} 
              onPress={this.logIn}>
              LOGIN
            </Button>
          </View>

          <View style={styles.buttonContainer}> 
            <Button 
              // mode="contained"
              style={styles.button} 
              onPress={this.signUp}>
              SignUp <Icon name='plus' onPress={() => navigation.navigate('SettingsScreen')} />
            </Button>
          </View> */}
        </View>


        <View style={styles.loginView}>
            <View style={styles.buttonContainerOne}> 
              <Button
                style={styles.button} 
                onPress={this.logIn}>
                LOGIN
              </Button>
            </View>

            <View style={styles.buttonContainer}> 
              <Button 
                // mode="contained"
                style={styles.button} 
                onPress={this.signUp}>
                SignUp 
                {/* <Icon name='plus' onPress={() => navigation.navigate('SettingsScreen')} /> */}
              </Button>
            </View>
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
    marginTop:'30%',
    // marginTop: 30,
    flex: 0,
    padding: 0,
    width: '100%',
    borderRadius: 50,
    // maxWidth: 340,
    // // alignSelf: 'center',
    // // alignItems: 'center',
    // // justifyContent: 'center',
  },

  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    height: 60,
    marginBottom: 5,
    color: 'white',
    // maxWidth: 340,
    // // alignSelf: 'center',
    // // alignItems: 'center',
    // // justifyContent: 'center',
  },

  sText: {
    fontSize: 20,
    fontWeight: 'bold',
    height: 30,
    marginBottom: 10,
    color: 'white',
    // maxWidth: 340,
    // // alignSelf: 'center',
    // // alignItems: 'center',
    // // justifyContent: 'center',
  },

  logoView: {
    marginTop: 70,
    // justifyContent: 'center',
    alignItems: 'center',
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
  buttonContainerOne: {
    marginTop: '20%',
    marginBottom: 5,
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
    borderColor: 'white',
    backgroundColor: '#8510d8',
    borderRadius: 20,
    
    // 
    borderWidth: 2,
    
  },

  loginView: {
    flex: 0,
    borderRadius: 50,
    // opacity: 0.42,
    // marginRight: '7%',
    // marginLeft: '7%',
    marginTop: '40%',
    backgroundColor: 'white',
    height: '100%',
    // width: '100%'    
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
