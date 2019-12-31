import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const WhiteLogo = () => (
  <Image source={require('../assets/WhiteLogo3.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 160,
    
    height: 160,
    marginBottom: 1, 
  },
});

export default memo(WhiteLogo);
