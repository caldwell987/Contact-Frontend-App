import React, { memo } from 'react';
import Button from '../components/Button';
import { AppRegistry, Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import TextInput from '../components/TextInput';
import { Dropdown } from 'react-native-material-dropdown';
import axios from 'axios';
import Constants from 'expo-constants';
import BackButton from '../components/BackButton';


export default class NewContactScreen extends React.Component {

    constructor(props) {
      super(props) 
      this.state = {
        pickerValue: 'Contact Type',
        contactValue: '',
        kind: '',
        typeSelect: false,

        data: [
          {
            value: 'Phone',
          },
          {
            value: 'Work Phone',
          },
          {
            value: 'Home Phone',
          }, 
          {
            value: 'Email',
          },
          {
            value: 'Work Email',
          },
          {
            value: 'Website',
          },
          {
            value: 'Organization',
          }, 
          {
            value: 'Title',
          }],

        value: ''
      }
      this.handleSubmit = this.handleSubmit.bind(this)
      this.typeSelect = this.typeSelect.bind(this)
    }

    handleSubmit(e) {
        const { navigation } = this.props;
        let userId = navigation.getParam('userId')
        let { value, contactValue } = this.state;
        axios.post("https://powerful-sea-75935.herokuapp.com/api/v1/contacts", {
            kind: value,
            value: contactValue,
            user_id: userId
            },
            { withCredentials: true }
        )
        .then(response => {
          console.log("NewContactScreen - HandleSubmit -  New Contact Added" )
          navigation.navigate('SettingsScreen')
        })
        .catch(error => {
            console.log("Adding New Contact Error ", error);
        });
        e.preventDefault();
    }

    typeSelect() {
        this.setState({
            typeSelect: !this.state.typeSelect
        });
      }

    render() {

        let data = this.state.data
        const { navigation } = this.props;
        // console.log("this Contact Type", this.state.value)
        // console.log("this Contact Value", this.state.contactValue)

        return (
            // <ScrollView style={styles.scrollView}>
                <View style={styles.container}> 
                  <BackButton goBack={() => navigation.navigate('SettingsScreen')} />
                  <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.name} > Add New Contact </Text>
                        </View>

                        <View style={styles.dropdown}> 
                            <Dropdown
                                label='Choose Contact Type'
                                data={data}
                                onChangeText={(value)=> {this.setState({value})}}
                            />
                        </View>

                        <View style={styles.input}> 

                            <TextInput 
                                label="Contact Value"
                                returnKeyType="done"
                                defaultValue="123-456-7890"
                                value={this.state.contactValue}
                                onChangeText={(contactValue) => this.setState({contactValue})}>
                            </TextInput>

                        </View>

                        <View style={styles.buttonContainer}>
                            <Button mode="outlined" onPress={this.handleSubmit}> Save </Button> 
                        </View>

                        {/* <View style={styles.buttonContainer}>
                            <Button mode="outlined" onPress={() => navigation.navigate('Dashboard')}> HOME </Button> 
                        </View>                  */}
                    </View>
                </View>
                </View>
            // </ScrollView>
        )
    }
}
AppRegistry.registerComponent('IosFonts', () => IosFonts);

//  -------------------------------------- Styling  --------------------------------------


const styles = StyleSheet.create({
    container: {
    // alignItems: 'center'
        marginBottom: 10,
    },
    body:{
      marginTop:80,
      height: 50,
    },
    bodyContent: {
      // flex: 1,
      alignItems: 'center',
      padding:30,
    },
    nameContainer: {
      marginTop:0,
      height:30,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
    },
    name:{
      fontSize:28,
      color: "black",
      fontWeight: "600",
      fontFamily: 'TimesNewRomanPS-BoldMT'
    },
    dropdown:{
      width: 300,
    },
    input:{
        width: 300
    },
    info:{
      fontSize:16,
      color: "#00BFFF",
      marginTop:15,
      backgroundColor: "#00BFFF",
    },
    buttonContainer: {
      marginTop:20,
      height:70,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:5,
      width:250,
    },
  });
  
  
