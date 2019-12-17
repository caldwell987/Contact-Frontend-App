import React, { memo } from 'react';
import Button from '../components/Button';
import { TouchableOpacity, Image, StyleSheet, Text, View, Linking, Alert, ScrollView} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';



export default class DeleteContact extends React.Component {

  constructor(props) {
    super(props) 
    this.state = {
      phone: [],
      email: [],
      businessName: [],
      website: [],
      linkedIn: [],
      facebook: [],
      instagram: [],
      snapChat: [],
    }
     this.delete = this.delete.bind(this)
  }

  //  -------------------------------------- Contact By Type--------------------------------------


  componentDidMount() {
    let contacts = this.props.myContacts;
    // console.log("ContactByType - Render - contacts ", contacts)

    let phone = contacts.filter(contact => contact.kind == "Phone");
    let email = contacts.filter(contact => contact.kind == "Email");
    let businessName = contacts.filter(contact => contact.kind == "Business Name");
    let website = contacts.filter(contact => contact.kind == "Website");
    let LinkedIn = contacts.filter(contact => contact.kind == "Linkedin");
    let Facebook = contacts.filter(contact => contact.kind == "Facebook");
    let Instagram = contacts.filter(contact => contact.kind == "Instagram");
    let SnapChat = contacts.filter(contact => contact.kind == "Snapchat");

    console.log("ContactByType - Render - Phone ", phone.value)

    this.setState({
      phone: phone,
      email: email,
      businessName: businessName,
      website: website,
      linkedIn: LinkedIn,
      facebook: Facebook,
      instagram: Instagram,
      snapChat: SnapChat
    }, ()=> 
    console.log("ContactByType - CDM - this.state.phone ", this.state.phone)
    );

    // console.log("ContactByType - Render - This.State.Phone ", this.state.phone)
    // console.log("ContactByType - Render - Phone ", this.state.email)
    // console.log("ContactByType - Render - Phone ", this.state.email)
  }



  delete(id) {
    let contactId = id
    console.log("delete", contactId)
    Alert.alert(
      "Are You Sure?",
      'Keep your app up to date to enjoy the latest features',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: (e) => 
          axios.delete("https://powerful-sea-75935.herokuapp.com/api/v1/contacts/" + contactId, {})
            .then(response => {
              console.log("Contact Was Deleted ", response)
            })
            .catch(error => {
              console.log("Delete Contact", error);
            })
        },
      ],
    );

  }



  //  -------------------------------------- Display Info --------------------------------------

  render() {

    const { navigation } = this.props;
    // console.log("ContactByType - Render - Contacts ", this.props.myContacts)

    return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.name} > Delete Contacts  </Text>
                        {this.state.phone.map(phone => <Text style={styles.contacts} key={phone.id} onPress={() => this.delete(phone.id)} > Phone: {phone.value} </Text> )}
                        {this.state.email.map(email => <Text style={styles.contacts} key={email.id} onPress={() => this.delete(email.id)} > Email: {email.value} </Text> )}
                        {this.state.website.map(website => <Text style={styles.contacts} key={website.id} onPress={() => this.delete(website.id)} > Website: {website.value} </Text> )}
                        {this.state.instagram.map(instagram => <Text style={styles.contacts} key={instagram.id} onPress={() => this.delete()} > Instagram: {instagram.value} </Text> )}
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
