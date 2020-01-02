import React, { memo, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { usernameValidator } from '../core/utils';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import Button from '../components/Button';

const ForgotPasswordScreen = ({ navigation }) => {
  const [username, setUsername] = useState({ value: '', error: '' });

  const _onSendPressed = () => {
    const usernameError = usernameValidator(username.value);

    if (usernameError) {
      setUsername({ ...username, error: usernameError });
      return;
    }

    navigation.navigate('LoginScreenClass');
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('LoginScreenClass')} />

      <Logo />

      <Header>Restore Password</Header>

      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={username.value}
        onChangeText={text => setUsername({ value: text, error: '' })}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
        autoCompleteType="username"
        textContentType="usernameAddress"
        keyboardType="username-address"
      />

      <Button mode="contained" onPress={_onSendPressed} style={styles.button}>
        Send Reset Instructions
      </Button>

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('LoginScreenClass')}
      >
        <Text style={styles.label}>← Back to login</Text>
      </TouchableOpacity>
    </Background>
  );
};

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
});

export default memo(ForgotPasswordScreen);
