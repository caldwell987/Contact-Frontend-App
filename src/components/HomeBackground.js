import React, { memo } from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

const HomeBackground = ({ children }) => (
  <ImageBackground
    source={require('../assets/Background7.jpg')}
    style={styles.background}
  >
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignSelf: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  // container: {
  //   flex: 1,
  //   padding: 0,
  //   width: '100%',
  //   maxWidth: 340,
  //   alignSelf: 'center',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});

export default memo(HomeBackground);
