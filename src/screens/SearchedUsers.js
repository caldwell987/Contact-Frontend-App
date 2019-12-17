import React, { memo } from 'react';
import Button from '../components/Button';
import { TouchableOpacity, Image, StyleSheet, Text, View, AsyncStorage} from 'react-native';


export default class Search extends React.Component {

  constructor() {
    super() 
    this.state = {
        searchValue: '',
        users: [],
        usersCopy: []
    }
    // this.handleChange = this.handleChange.bind(this)
  }


//  -------------------------------------- Collecting User Data --------------------------------------



  //  -------------------------------------- Logging Out --------------------------------------



   //  -------------------------------------- My Contacts --------------------------------------






  //  -------------------------------------- Add Contact --------------------------------------




  //  -------------------------------------- Display Info --------------------------------------

  render() {

    return (
            
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.name} > Contacts  </Text>
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
      // alignItems: 'center'
      marginBottom: 10,
    },
  });
  