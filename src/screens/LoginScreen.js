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

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  let usernameValue = username.value
  let passwordValue = password.value

    console.log(usernameValue)
  
  const _onLoginPressed = () => {


    axios.post("http://localhost:3001/api/v1/sessions", {
        user: {
            username: usernameValue,
            password: passwordValue
        }
    },
        { withCredentials: true }
    )
        .then(response => {
            if (response.data.logged_in) {
              navigation.navigate('Dashboard');
            }
            else {
              setUsername({ ...username, error: usernameError });
              setPassword({ ...password, error: passwordError });
              return;
            }
        })
        .catch(error => {
            console.log("Login Error", error)
        })
  };

  const handleSubmit = ({navigation}) => {
   
    // let username = username.value
    // let password = password.value

    // console.log(username)

    // axios.post("http://localhost:3001/api/v1/sessions", {
    //     user: {
    //         username: username,
    //         password: password
    //     }
    // },
    //     { withCredentials: true }
    // )
    //     .then(response => {
    //         if (response.data.logged_in) {
    //           navigation.navigate('Dashboard');
    //         }
    //         else {
    //           setUsername({ ...username, error: usernameError });
    //           setPassword({ ...password, error: passwordError });
    //           return;
    //         }
    //     })
    //     .catch(error => {
    //         console.log("Login Error", error)
    //     })
    // event.preventDefault();

    // const usernameError = usernameValidator(username.value);
    // const passwordError = passwordValidator(password.value);
    

    // if (usernameError || passwordError) {
    //   setUsername({ ...username, error: usernameError });
    //   setPassword({ ...password, error: passwordError });
    //   return;
    // }

    // navigation.navigate('Dashboard');
}

  // console.log(username.value)

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Logo />

      <Header>Welcome back.</Header>

      <TextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={text => setUsername({ value: text, error: '' })}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
        autoCompleteType="username"
        textContentType="username"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
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

export default memo(LoginScreen);
