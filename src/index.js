import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { View, ActivityIndicator, StatusBar, StyleSheet, AsyncStorage} from 'react-native';


import {
  HomeScreen,
  LoginScreenClass,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
} from './screens';
import { Component } from 'react';


const Router = createStackNavigator(
  {
    // HomeScreen,
    Dashboard,
    LoginScreenClass,
    RegisterScreen,
    ForgotPasswordScreen,

  },
  {
    // initialRouteName: 'HomeScreen',
    headerMode: 'none',
  }
);

const AuthStack = createStackNavigator({HomeScreen})

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)
    this._loadData()
  }

  render() {

    return(
      <View >
        <ActivityIndicator/>
        <StatusBar barStyle="default"/>
      </View>

    )
  }

  _loadData = async() => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn')
    console.log("herrrrrreee", isLoggedIn)
    this.props.navigation.navigate(isLoggedIn == '1'? 'Auth' : 'App')
  }

}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AuthStack,
      Auth: Router,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

