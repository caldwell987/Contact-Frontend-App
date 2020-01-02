import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, AsyncStorage, ActivityIndicator, } from 'react-native';
import HomeBackground from '../components/HomeBackground';
import Button from '../components/Button';
import UsernameInput from '../components/UsernameInput';
import PasswordInput from '../components/PasswordInput';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import axios from 'axios';

export default class LoginScreenClass extends React.Component {

  constructor(props) {
    super(props) 
    this.state = {
      username: "",
      password: '',
      loginError: '',
      user: this.props.user, 
      spinner: false
    }
    this.handleLogin = this.handleLogin.bind(this)
    this._login = this._login.bind(this)
  }

  handleLogin() {
    this.setState({
      spinner: true
    })
    const { username, password } = this.state
    let usernameLowerCase = username.toLowerCase()
    axios.post("https://powerful-sea-75935.herokuapp.com/api/v1/sessions", {
      user: {
          username: usernameLowerCase,
          password: password
      }
    },
      { withCredentials: true }
    )
    .then(response => {
        if (response.data.logged_in) {
          this._login(response)
          this.setState({
            spinner: false
          })
        }
        else {
          console.log("LoginScreen - handleLogin - Login Failed")
          this.setState({
            loginError: 'Username Or Password is Incorrect',
            spinner: false
          })
        }
    })
    .catch(error => {
        console.log("Login Error", error)
    })
  }

  render() {

    const { navigation } = this.props;
    console.log(this.state.username)

    return (

      <HomeBackground>

        <BackButton goBack={(e) => this.props.home(e)} />
        <View style={styles.viewContainer}>
        
          <View style={styles.headerView} >
            <Text style={styles.headerText} > Welcome Back </Text>
          </View>

          <Text>{this.state.loginError}</Text>

          {this.state.spinner && 

          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>}

          <View style={styles.inputContainer}>

            <UsernameInput
              placeholder="Username"
              placeholderTextColor="rgba(230, 230, 230,1)"
              returnKeyType="next"
              defaultValue="Username"
              value={this.state.username}
              onChangeText={(username) => this.setState({username})}
              autoCapitalize="none"
              autoCompleteType="username"
              textContentType="username"
              maxLength={15}
              clearButtonMode="while-editing"
              // style={styles.input} 
              ></UsernameInput>

          </View>

          <View style={styles.inputContainer}>
            <PasswordInput
              placeholder="Password"
              placeholderTextColor="rgba(230, 230, 230,1)"
              returnKeyType="done"
              secureTextEntry={true} 
              value={this.state.password}
              onChangeText={(password) => this.setState({password})}
              autoCapitalize="none"
              autoCompleteType="password"
              textContentType="password"
              maxLength={15}
              clearButtonMode="while-editing"
            />
          </View>
          <View style={styles.buttonContainer}> 
              <Button 
                style={styles.button} 
                onPress={this.handleLogin}>
                Login 
              </Button>
              <Text style={styles.label}>Don’t have an account? </Text>
              <TouchableOpacity onPress={() => this.props.signUp()}>
                <Text style={styles.link}>Sign up</Text>
              </TouchableOpacity>
            </View>
        </View>
      </ HomeBackground>
    );
  }

  _login = async(response) => {
    const { navigation } = this.props;
    console.log("LoginScreen - _login- IsLoggedIN")
    await AsyncStorage.setItem('isLoggedIn', '1')
    navigation.navigate('Dashboard');
    this.props.checkLoginStatus()
  }

};

const styles = StyleSheet.create({

  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },

  viewContainer: {
    marginTop:'70%',
    flex: 0,
    padding: 0,
    width: '100%',
  },

  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 60,
    color: 'white'
  },

  inputContainer: {
    marginBottom:15,
    height:60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    marginTop:50,
    marginBottom:30,
    flex: 0,
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    justifyContent: 'center',
    width: '70%',
    alignItems: 'stretch',
    height:50,
    borderColor: 'white',
    // backgroundColor: '#8510d8',
    borderRadius: 20,
    borderWidth: 2,
    
  },

  headerView: {
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    marginTop: 4,
  },

  label: {
    marginTop: 20,
    color: theme.colors.secondary,
  },

  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },

  passwordInput: {
    margin: 20,
  }

});

