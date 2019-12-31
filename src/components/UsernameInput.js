import React, { memo } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { theme } from '../core/theme';

const UsernameInput = ({ errorText, ...props }) => (
  <View style={styles.container}>
    <TextInput
        paddingLeft={12}
        style={styles.textInput}
        {...props}
      ></TextInput>
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '85%',
    height: 70
  },
  textInput: {
    height: 52,
    backgroundColor: "rgba(15,15, 15,0)",
    color: "rgba(255,255,255,1)",
    borderRadius: 8,
    borderColor: "rgba(255,255,255,1)",
    borderWidth: 2,
    shadowOffset: {
    height: 2,
    width: 2
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.19,
    lineHeight: 17,
    letterSpacing: 0
  }
});

export default memo(UsernameInput);
