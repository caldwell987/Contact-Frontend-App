import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import {
  usernameValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';
import axios from 'axios';

class RegisterScreen extends React.Component {

  constructor(props) {
    super(props) 
      this.state = {
        username: "",
        password: "",
        passwordConfirmation: "",
        firstName: "",
        lastName: "",
        registrationErrors: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }




  handleSubmit() {

    const { username, password, passwordConfirmation, firstName, lastName } = this.state
    const { navigation } = this.props;
    console.log("yo")
      console.log(password)
      console.log("First Name", firstName)
      console.log("Last Name", lastName)
      axios.post("https://powerful-sea-75935.herokuapp.com/api/v1/registrations", {
        user: {
          username: username,
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
            navigation.navigate('Dashboard', 
            {
              user: response.data.user,
              loggedInStatus: "LOGGED_IN"
            }
            );
            console.log(response.data)
          }
          else {
            console.log("nah")
            this.setState({
              registrationErrors: 'Username Or Password is Incorrect'
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
          <BackButton goBack={() => navigation.navigate('HomeScreen')} />

          <Logo />

          <Header>Create Account</Header>

          <TextInput
            label="First Name"
            returnKeyType="next"
            value={this.state.firstName}
            onChangeText={(firstName) => this.setState({firstName})}
          />

          <TextInput
            label="Last Name"
            returnKeyType="next"
            value={this.state.lastName}
            onChangeText={(lastName) => this.setState({lastName})}            
            autoCompleteType="lastName"
          />

          <TextInput
            label="Username"
            returnKeyType="done"
            value={this.state.username}
            onChangeText={(username) => this.setState({username})}
            autoCapitalize="none"
          />

          <TextInput
            label="Password"
            returnKeyType="done"
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
            autoCapitalize="none"
            secureTextEntry
          />


          <TextInput
            label="Password Confirmation"
            returnKeyType="done"
            value={this.state.password_confirmation}
            onChangeText={(passwordConfirmation) => this.setState({passwordConfirmation})}
            secureTextEntry
          />

          <Button mode="contained" onPress={this.handleSubmit} style={styles.button}>
            Sign Up
          </Button>

          <View style={styles.row}>
            <Text style={styles.label}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </Background>
      );
    };
  }


export default RegisterScreen;


const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});