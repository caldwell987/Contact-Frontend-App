import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { usernameValidator, passwordValidator } from '../core/utils';
import axios from 'axios';

class LoginScreenClass extends React.Component {

  constructor(props) {
    super(props) 
    this.state = {
      username: "",
      password: '',
      loginError: '',
      user: this.props.user
    }
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin() {
    const { navigation } = this.props;
    console.log("yo")
      const { username, password } = this.state
      console.log(password)
      axios.post("https://powerful-sea-75935.herokuapp.com/api/v1/sessions", {
        user: {
            username: "David999",
            password: "Password"
        }
      },
        { withCredentials: true }
      )
      .then(response => {
          if (response.data.logged_in) {
            navigation.navigate('Dashboard', {
              user: response.data.user,
              loggedInStatus: "LOGGED_IN"
            });
            // console.log(response.data)
            // this.props.checkLoginStatus()
          }
          else {
            console.log("nah")
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
      {/* <BackButton goBack={() => this.props.navigation.navigate('HomeScreen')} /> */}

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

      <TextInput
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
});

export default LoginScreenClass;



















// handleSubmit() {

  //   const { username, password } = this.state
  //   console.log(password)
  //   axios.post("https://powerful-sea-75935.herokuapp.com/api/v1/sessions", {
  //     user: {
  //         username: "David999",
  //         password: "Password"
  //     }
  //   },
  //     { withCredentials: true }
  //   )
  //     .then(response => {
  //         if (response.data.logged_in) {
  //           this.props.navigation.navigate('Dashboard', {
  //             user: response.data,
  //             loggedIn: response.data.logged_in
  //           });
  //           // console.log(response.data)
  //         }
  //         else {
  //           console.log("nah")
  //           this.setState({
  //             loginError: 'Username Or Password is Incorrect'
  //           })
  //         }
  //     })
  //     .catch(error => {
  //         console.log("Login Error", error)
  //     })
  // }