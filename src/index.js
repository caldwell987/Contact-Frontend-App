import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  HomeScreen,
  LoginScreenClass,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
} from './screens';

const Router = createStackNavigator(
  {
    HomeScreen,
    // LoginScreen,
    LoginScreenClass,
    RegisterScreen,
    ForgotPasswordScreen,
    Dashboard,
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
