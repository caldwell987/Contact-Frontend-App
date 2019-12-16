import React, { memo } from 'react';
import Button from '../components/Button';
import { TouchableOpacity, Image, StyleSheet, Text, View, Linking, SafeAreaView, ScrollView} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

export default class AddNewContact extends React.Component {

    constructor(props) {
      super(props) 
      this.state = {
        value: [],
        kind: [],
      }
      // this.checkLoginStatus = this.checkLoginStatus.bind(this)
    }

    render() {

        return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.name} > Hello  </Text>                       
                </View>
            </ScrollView>
        )
    }
}

//  -------------------------------------- Styling  --------------------------------------


const styles = StyleSheet.create({
    body:{
      marginTop:10,
      height: 50,
      alignItems: 'center'
    },
    name:{
      fontSize:28,
      color: "black",
      fontWeight: "600"
    },
    contacts:{
      fontSize:20,
      color: "#696969",
      fontWeight: "400",
      marginTop: 10
    },
  
    buttonContainer: {
      marginTop:0,
      height:70,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:5,
      width:250,
    },
  
    scrollView: {
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
    container: {
      alignItems: 'center'
    },
  });
  