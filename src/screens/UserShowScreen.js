import React, { memo } from 'react';
import Button from '../components/Button';
import { Linking, StyleSheet, Text, View, ScrollView} from 'react-native';
import axios from 'axios';
import BackButton from '../components/BackButton';


export default class UserShowScreen extends React.Component {

  constructor() {
    super() 
    this.state = {
        user: [],
        userCopy: [],
        myContacts: [],
        myContactsCopy: [],
        phone: [],
        email: [],
        businessName: [],
        website: [],
        linkedIn: [],
        facebook: [],
        instagram: [],
        snapChat: [],
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    let userId = navigation.getParam('userId')
    axios.get("https://powerful-sea-75935.herokuapp.com/myconnection/" + userId, )
    .then(response => { 
      this.setState({
        user: response.data,
        userCopy: response.data,
        myContacts: response.data.contacts,
        myContactsCopy: response.data
      }, () => this.sortByType())
    })
  }

  sortByType() {
    let contacts = this.state.myContacts;
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
    });
  }

  render() {
    const { navigation } = this.props;

    return (
    
      <View style={styles.container}>
        <BackButton onPress={() => this.props.navigation.goBack()} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <View style={styles.nameContainer}>
            <Text style={styles.name} > {this.state.user.firstname} {this.state.user.lastname}</Text>
            <Text style={styles.name} > User Show Screen</Text>
            </View>   
            <ScrollView style={styles.scrollView}>
              <View style={styles.contactContent}>
                {this.state.phone.map(phone => 
                    <Text style={styles.contacts} key={phone.id} onPress={() => Linking.openURL(`tel:${phone.value}`)} > 
                        Phone: {phone.value} </Text> )}
                {this.state.email.map(email => 
                    <Text style={styles.contacts} key={email.id} onPress={() => Linking.openURL(`mailto:${email.value}`)} > 
                        Email: {email.value} </Text> )}
                {this.state.website.map(website => 
                    <Text style={styles.contacts} key={website.id} onPress={() => Linking.openURL(`https://${website.value}`)} > 
                        Website: {website.value} </Text> )}
                {this.state.instagram.map(instagram => 
                    <Text style={styles.contacts} key={instagram.id} onPress={() => Linking.openURL(`https://${instagram.value}`)} > 
                        Instagram: {instagram.value} </Text> )}
              </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
              <Button mode="outlined" onPress={() => navigation.navigate('SearchScreen')}> Back </Button> 
            </View>      
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body:{
    marginTop:80,
  },

  bodyContent: {
    alignItems: 'center',
    padding:30,
    height: 500
  },

  name:{
    fontSize:28,
    color: "black",
    fontWeight: "600"
  },

  scrollView: {
    marginHorizontal: 20,
    width: 500,
    marginTop: 20,
  },

  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:15,
    backgroundColor: "#00BFFF",
  },

  description:{
    fontSize:16,
    lineHeight:20,
    color: "#00BFFF",
    marginTop:10,
    textAlign: 'center',
    backgroundColor: "#00BFFF",
  },

  nameContainer: {
    marginTop:0,
    height:30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
  },

  nameText: {
    color: "#0076BC"
  },

  buttonContainer: {
    marginTop:15,
    height:70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:5,
    width:250,
  },

  contactContent: {
    alignItems: 'center',
    height: 200,
    width: 500,
    marginTop: 10,
    marginBottom: 20
  },

  contacts:{
    fontSize:20,
    color: "#696969",
    fontWeight: "400",
    marginTop: 10
  },

});
