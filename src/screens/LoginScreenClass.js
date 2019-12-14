import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInputText';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { usernameValidator, passwordValidator } from '../core/utils';
import axios from 'axios';

export default class LoginScreenClass extends React.Component {

  constructor(props) {

    super(props) 

    this.state = {
      username: "",
      password: '',
      loginError: '',
      user: this.props.user
    }

    this.handleLogin = this.handleLogin.bind(this)
    this._login = this._login.bind(this)

  }

  
  handleLogin() {
    console.log("LoginScreen - handleLogin")
    const { username, password } = this.state
    console.log(password)
    axios.post("https://powerful-sea-75935.herokuapp.com/api/v1/sessions", {
      user: {
          username: username,
          password: password
      }
    },
      { withCredentials: true }
    )
    .then(response => {
        if (response.data.logged_in) {
          this._login(response)
        }
        else {
          console.log("LoginScreen - handleLogin - Login Failed")
          this.setState({
            loginError: 'Username Or Password is Incorrect'
          })
        }
    })
    .catch(error => {
        console.log("Login Error", error)
    })
  }

  render() {

    const { navigation } = this.props;

    return (
      <Background>
        <BackButton goBack={(e) => this.props.home(e)} />
        <Logo />
        <Header>Welcome back.</Header> 
        <Text>{this.state.loginError}</Text>
        
        <TextInput
          label="Username"
          returnKeyType="next"
          defaultValue="David999"
          value={this.state.username}
          onChangeText={(username) => this.setState({username})}
          autoCapitalize="none"
          autoCompleteType="username"
          textContentType="username"
        />

        <PasswordInput
          label="Password"
          returnKeyType="done"
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
        />

        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPasswordScreen')}
          >
            <Text style={styles.label}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <Button mode="contained" onPress={this.handleLogin}>
          Login
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Background>
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
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
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

