import React, { memo } from 'react';
import Button from '../components/Button';
import { TouchableOpacity, Image, StyleSheet, View, Linking, Alert, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { Container, Content, List, ListItem, Text, Input } from 'native-base';
import axios from 'axios';
import { Avatar} from 'react-native-paper';

export default class AddPhone extends React.Component {

    constructor(props) {
      super(props) 
      this.state = {
        contactValue: '',
      }
    }


    addPhone() {
        let type = this.props.type
        let toggle = this.props.toggle
        let value = this.state.contactValue
        let userId = this.props.userId

        axios.post("https://powerful-sea-75935.herokuapp.com/api/v1/contacts", {
            kind: type,
            value: value,
            user_id: userId
            },
            { withCredentials: true }
        )
        .then(response => {
            this.props.updateContacts(response.data, toggle);
        })
        .catch(error => {
            console.log("Adding New Contact Error ", error);
        });
    }

    render() {

        let type = this.props.type
    
        return ( 
            <ListItem > 
                <TouchableOpacity onPress={() => this.addPhone()}>
                    <Avatar.Icon icon="check" size={20} />
                </TouchableOpacity>

                    {type === 'Phone' &&
                        <Input style={styles.input} placeholder='(281)-111-1111' onChangeText={(contactValue) => this.setState({contactValue})} />
                    || type === 'Work Phone' &&
                        <Input style={styles.input} placeholder='(281)-111-1111' onChangeText={(contactValue) => this.setState({contactValue})} />
                    || type === 'Home Phone' &&
                        <Input style={styles.input} placeholder='(281)-111-1111' onChangeText={(contactValue) => this.setState({contactValue})} />
                    || type === 'Email' &&
                        <Input style={styles.input} placeholder='example@gmail.com' onChangeText={(contactValue) => this.setState({contactValue})} />
                    || type === 'Work Email' &&
                        <Input style={styles.input} placeholder='example@gmail.com' onChangeText={(contactValue) => this.setState({contactValue})} />
                    || type === 'Website' &&
                        <Input style={styles.input} placeholder='www.example.com' onChangeText={(contactValue) => this.setState({contactValue})} />
                    || type === 'Organization' &&
                        <Input style={styles.input} placeholder='Google' onChangeText={(contactValue) => this.setState({contactValue})} />
                    || type === 'Title' &&
                        <Input style={styles.input} placeholder='Developer' onChangeText={(contactValue) => this.setState({contactValue})} />
        
                    }
                


                {/* <Input style={styles.input} placeholder='(281)-111-1111' onChangeText={(contactValue) => this.setState({contactValue})} /> */}
            </ListItem>
        )
    }

}


const styles = StyleSheet.create({

    input: {
        fontSize: 16,
        height: 25
    },

})


