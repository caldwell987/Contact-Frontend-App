import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, AsyncStorage, ActivityIndicator, } from 'react-native';
import HomeBackground from '../components/HomeBackground';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import UsernameInput from '../components/UsernameInput';
import PasswordInput from '../components/PasswordInput';
import TextInput from '../components/TextInput';
// import PasswordInput from '../components/PasswordInputText';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { usernameValidator, passwordValidator } from '../core/utils';
import axios from 'axios';

export default class SignupScreen extends React.Component {

  constructor(props) {

    super(props) 

    this.state = {
      username: "",
      password: "",
      passwordConfirmation: "",
      firstName: "",
      lastName: "",
      registrationErrors: "",
      spinner: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  
  handleSubmit() {

    this.setState({
      spinner: true
    })

    const { username, password, passwordConfirmation, firstName, lastName } = this.state
    const { navigation } = this.props;
    let usernameLowerCase = username.toLowerCase()
    axios.post("https://powerful-sea-75935.herokuapp.com/api/v1/registrations", {
        user: {
          username: usernameLowerCase,
          password: password,
          password_confirmation: passwordConfirmation,
          firstname: firstName,
          lastname: lastName
        }
      },
        { withCredentials: true }
      )
      .then(response => {
          if (response.data.status === 'created')  {
            this.props.home()
          }
          else {
            console.log("RegisterScreen - handleSubmit - REG FAILED", response)
            this.setState({
              spinner: false,
              registrationErrors: 'Fields Are Blank or Username is Taken'
            })
          }
      })
      .catch(error => {
        console.log(error)
          this.setState({
              spinner: false,
              registrationErrors: 'Fields Are Blank or Username is Taken'
          })
      })
  }

  render() {
    const { navigation } = this.props;

    return (

      <HomeBackground>
        <BackButton goBack={(e) => this.props.home(e)} />
        <View style={styles.viewContainer}>
          <View style={styles.headerView} >
            <Text style={styles.headerText} > Welcome </Text>
            <Text style={styles.errorText} > {this.state.registrationErrors} </Text>
          </View>

          {this.state.spinner && 
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>}

          <View style={styles.inputContainer}>
            <UsernameInput
              placeholder="First Name"
              placeholderTextColor="rgba(230, 230, 230,1)"
              returnKeyType="next"
              defaultValue="FirstName"
              value={this.state.firstName}
              onChangeText={(firstName) => this.setState({firstName})}
              // autoCapitalize="none"
              maxLength={15}
              clearButtonMode="while-editing"
            />
          </View>

          <View style={styles.inputContainer}>
            <UsernameInput
              placeholder="Last Name"
              placeholderTextColor="rgba(230, 230, 230,1)"
              returnKeyType="next"
              defaultValue="Last Name"
              value={this.state.lastName}
              onChangeText={(lastName) => this.setState({lastName})}
              // autoCapitalize="none"
              maxLength={15}
              clearButtonMode="while-editing"
            />
          </View>

          <View style={styles.inputContainer}>
            <UsernameInput
              placeholder="Username"
              placeholderTextColor="rgba(230, 230, 230,1)"
              returnKeyType="next"
              defaultValue="Username"
              value={this.state.username}
              onChangeText={(username) => this.setState({username})}
              autoCapitalize="none"
              maxLength={15}
              clearButtonMode="while-editing"
            />
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

          <View style={styles.inputContainer}>
            <PasswordInput
              placeholder="Password Confirmation"
              placeholderTextColor="rgba(230, 230, 230,1)"
              returnKeyType="done"
              secureTextEntry={true} 
              value={this.state.passwordConfirmation}
              onChangeText={(passwordConfirmation) => this.setState({passwordConfirmation})}
              autoCapitalize="none"
              // autoCompleteType="password"
              // textContentType="password"
              maxLength={15}
              clearButtonMode="while-editing"
            />
          </View>

          {/* <View style={styles.forgotPassword}>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}></TouchableOpacity>
          </View> */}

          <View style={styles.buttonContainer}> 
              <Button 
                style={styles.button} 
                onPress={this.handleSubmit}>
                Sign Up
              </Button>

              <Text style={styles.label}> Already have an account? </Text>
              <TouchableOpacity onPress={() => this.props.logIn()}>
                <Text style={styles.link}> Sign In </Text>
              </TouchableOpacity>

            </View>
        </View>
      </ HomeBackground>
    );
  }
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  viewContainer: {
    marginTop:'40%',
    flex: 0,
    padding: 0,
    width: '100%',
  },

  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 60,
    color: 'white'
    // maxWidth: 340,
    // // alignSelf: 'center',
    // // alignItems: 'center',
    // // justifyContent: 'center',
  },

  errorText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'black'
    // maxWidth: 340,
    // // alignSelf: 'center',
    // // alignItems: 'center',
    // // justifyContent: 'center',
  },

  inputContainer: {
    marginBottom:15,
    height:60,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black'
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
  },
});

