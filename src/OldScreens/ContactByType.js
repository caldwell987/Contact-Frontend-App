import React, { memo } from 'react';
import Button from '../components/Button';
import {StyleSheet, Text, View, Linking, SafeAreaView, ScrollView} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';



export default class contactByType extends React.Component {

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
    // this.checkLoginStatus = this.checkLoginStatus.bind(this)
  }

  //  -------------------------------------- Contact By Type--------------------------------------


  componentDidMount() {

    let contacts = this.props.myContacts;

    let phone = contacts.filter(contact => contact.kind == "Phone");
    let email = contacts.filter(contact => contact.kind == "Email");
    let businessName = contacts.filter(contact => contact.kind == "Business Name");
    let website = contacts.filter(contact => contact.kind == "Website");
    let LinkedIn = contacts.filter(contact => contact.kind == "Linkedin");
    let Facebook = contacts.filter(contact => contact.kind == "Facebook");
    let Instagram = contacts.filter(contact => contact.kind == "Instagram");
    let SnapChat = contacts.filter(contact => contact.kind == "Snapchat");

    this.setState({
      phone: phone,
      email: email,
      businessName: businessName,
      website: website,
      linkedIn: LinkedIn,
      facebook: Facebook,
      instagram: Instagram,
      snapChat: SnapChat
    }
// , ()=> console.log("ContactByType - CDM - this.state.phone ", this.state.phone)
    );
  }



  //  -------------------------------------- Display Info --------------------------------------

  render() {

    return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.name} > Contacts  </Text>
                        {this.state.phone.map(phone => <Text style={styles.contacts} key={phone.id} onPress={() => Linking.openURL(`tel:${phone.value}`)} > Phone: {phone.value} </Text> )}
                        {this.state.email.map(email => <Text style={styles.contacts} key={email.id} onPress={() => Linking.openURL(`mailto:${email.value}`)} > Email: {email.value} </Text> )}
                        {this.state.website.map(website => <Text style={styles.contacts} key={website.id} onPress={() => Linking.openURL(`https://${website.value}`)} > Website: {website.value} </Text> )}
                        {this.state.instagram.map(instagram => <Text style={styles.contacts} key={instagram.id} onPress={() => Linking.openURL(`https://${instagram.value}`)} > Instagram: {instagram.value} </Text> )}
                </View>
            </ScrollView>
    )
  }
}




//  -------------------------------------- Styling  --------------------------------------


const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
  },
  container: {
    alignItems: 'center',
    marginBottom: 10,
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
  }
});
