import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import PasswordInputText from 'react-native-hide-show-password-input'
import { theme } from '../core/theme';

const PasswordInput = ({ errorText, ...props }) => (
  <View style={styles.container}>
    <PasswordInputText
      style={styles.input}
      selectionColor={theme.colors.primary}
      underlineColor="transparent"
      mode="outlined"
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '85%',
    marginVertical: 12,
    // borderWidth: 1,
  },
  input: {
    marginRight: 10,
    // backgroundColor: theme.colors.surface,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(PasswordInput);