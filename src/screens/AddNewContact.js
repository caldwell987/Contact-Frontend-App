import React, { memo } from 'react';
import Button from '../components/Button';
import { TouchableOpacity, Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import TextInput from '../components/TextInput';
import { Dropdown } from 'react-native-material-dropdown';
import axios from 'axios';
import Constants from 'expo-constants';

export default class AddNewContact extends React.Component {

    constructor(props) {
      super(props) 
      this.state = {
        pickerValue: 'Contact Type',
        contactValue: '',
        kind: '',
        typeSelect: false,

        data: [{
            value: 'Phone',
          }, {
            value: 'Email',
          }, {
            value: 'Website',
          }],

        value: ''
      }
      this.handleSubmit = this.handleSubmit.bind(this)
      this.typeSelect = this.typeSelect.bind(this)
    }

    handleSubmit(e) {
        let userId = this.props.userId;
        let { value, contactValue } = this.state;
        axios.post("https://powerful-sea-75935.herokuapp.com/api/v1/contacts", {
            kind: value,
            value: contactValue,
            user_id: userId
            },
            { withCredentials: true }
        )
        .then(response => {
            this.props.addedContactUpdated(response.data);
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
        // console.log("this Contact Type", this.state.value)
        // console.log("this Contact Value", this.state.contactValue)

        return (
            // <ScrollView style={styles.scrollView}>
                <View style={styles.container}> 

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
                </View>
            // </ScrollView>
        )
    }
}

//  -------------------------------------- Styling  --------------------------------------


const styles = StyleSheet.create({
    body:{
      marginTop:0,
      height: 50,
      alignItems: 'center'
    },
    name:{
      fontSize:28,
      color: "black",
      fontWeight: "600"
    },
    dropdown:{
        width: 300
    },
    input:{
        width: 300
    },

    choices:{
        fontSize:20,
        color: "#696969",
        fontWeight: "400",
        marginTop: 0
     }, 

    contacts:{
      fontSize:20,
      color: "#696969",
      fontWeight: "400",
      marginTop: 10
    },
  
    buttonContainer: {
        marginTop: 0,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        width: 250,
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
  







                {/* <View style={styles.buttonContainer}>
                    <Button mode="outlined" onPress={this.typeSelect}> {this.state.pickerValue} </Button> 
                </View> 
                { this.state.typeSelect && 
                <View style={styles.choices} >                
                    <Picker 
                        mode="dropdown"
                        style={styles.picker}
                        selectedValue={this.state.pickerValue}
                        onValueChange={this.contactType}
                     >
                        <Picker.Item label="Phone" value="Phone" />
                        <Picker.Item label="Email" value="Email" />
                        <Picker.Item label="Website" value="Website" />
                    </Picker>  
                </View>
                } */}

