import React, { memo } from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

const DashboardBackground = ({ children }) => (
  <ImageBackground
    source={require('../assets/Background8.jpg')}
    style={styles.background}
  >
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1
  },

});

export default memo(DashboardBackground);
