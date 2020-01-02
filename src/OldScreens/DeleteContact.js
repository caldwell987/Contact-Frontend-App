import React, { memo } from 'react';
import Button from '../components/Button';
import { TouchableOpacity, Image, StyleSheet, Text, View, Linking, Alert, ScrollView} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import BackButton from '../components/BackButton';



export default class DeleteContact extends React.Component {

  constructor(props) {
    super(props) 
    this.state = {
      myContacts: [],
      myContactsCopy: [],
      phone: [],
      workPhone: [],
      homePhone: [],
      email: [],
      workEmail: [],
      website: [],
      organization: [],
      title: [],
      linkedIn: [],
      facebook: [],
      instagram: [],
      snapChat: [],
    }
     this.delete = this.delete.bind(this)
     this.sortByType = this.sortByType.bind(this)
  }

  //  -------------------------------------- Contact By Type--------------------------------------


  componentDidMount() {
    const { navigation } = this.props;
    let userId = navigation.getParam('userId')
    // console.log("DeleteContact UserId ", userId)
    axios.get("https://powerful-sea-75935.herokuapp.com/api/v1/user_id/" + userId, )
    .then(response => { 
      this.setState({
        myContacts: response.data.contacts,
        myContactsCopy: response.data.contacts
      }, () => this.sortByType())
      // console.log("Dashboard - myContactsFunc - Users Contacts", this.state.myContacts)
    })
  }

  sortByType() {
    let contacts = this.state.myContacts;
    // console.log("ContactByType - Render - contacts ", contacts)

    let phone = contacts.filter(contact => contact.kind == "Phone");
    let workPhone = contacts.filter(contact => contact.kind == "Work Phone");
    let homePhone = contacts.filter(contact => contact.kind == "Home Phone");
    let email = contacts.filter(contact => contact.kind == "Email");
    let workEmail = contacts.filter(contact => contact.kind == "Work Email");
    let website = contacts.filter(contact => contact.kind == "Website");
    let organization = contacts.filter(contact => contact.kind == "Organization");
    let title = contacts.filter(contact => contact.kind == "Title");
    let LinkedIn = contacts.filter(contact => contact.kind == "Linkedin");
    let Facebook = contacts.filter(contact => contact.kind == "Facebook");

    

    this.setState({
      phone: phone,
      workPhone: workPhone,
      homePhone: homePhone,
      email: email,
      workEmail: workEmail,
      website: website,
      organization: organization,
      title: title,
      linkedIn: LinkedIn,
      facebook: Facebook,
    }
    );
  }

  delete(id) {
    const { navigation } = this.props;
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
              this.componentDidMount()
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

    console.log('this is org ', this.state.organization)

    return (

      <View style={styles.container}>
        <BackButton goBack={() => navigation.navigate('SettingsScreen')} />
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <View style={styles.nameContainer}>
                <Text style={styles.name} > Delete Contact </Text>
                </View>   

                <View style={styles.contactContent}>
                  <ScrollView style={styles.scrollView}>
                    <View style={styles.centerContacts} >
                      {this.state.phone.map(phone => <Text style={styles.contacts} key={phone.id} onPress={() => this.delete(phone.id)} > Phone: {phone.value} </Text> )}
                      {this.state.workPhone.map(workPhone => <Text style={styles.contacts} key={workPhone.id} onPress={() => this.delete(workPhone.id)} > Work Phone: {workPhone.value} </Text> )}
                      {this.state.homePhone.map(homePhone => <Text style={styles.contacts} key={homePhone.id} onPress={() => this.delete(homePhone.id)} > Home Phone: {homePhone.value} </Text> )}
                      {this.state.email.map(email => <Text style={styles.contacts} key={email.id} onPress={() => this.delete(email.id)} > Email: {email.value} </Text> )}
                      {this.state.workEmail.map(workEmail => <Text style={styles.contacts} key={workEmail.id} onPress={() => this.delete(workEmail.id)} > Work Email: {workEmail.value} </Text> )}
                      {this.state.website.map(website => <Text style={styles.contacts} key={website.id} onPress={() => this.delete(website.id)} > Website: {website.value} </Text> )}
                      {this.state.organization.map(organization => <Text style={styles.contacts} key={organization.id} onPress={() => this.delete(organization.id)} > Organization: {organization.value} </Text> )}
                      {this.state.title.map(title => <Text style={styles.contacts} key={title.id} onPress={() => this.delete(title.id)} > Title: {title.value} </Text> )}
                      {/* <Text style={styles.contacts} key={this.state.organization.id} onPress={() => this.delete(this.state.organization.id)} > Organization: {this.state.organization.value} </Text>  */}
                      {/* <Text style={styles.contacts} key={this.state.title.id} onPress={() => this.delete(this.state.title.id)} > Title: {this.state.title.value} </Text>  */}
                      {/* {this.state.linkedIn.map(linkedIn => <Text style={styles.contacts} key={linkedIn.id} onPress={() => this.delete()} > Linkedin: {linkedIn.value} </Text> )} */}
                      {/* {this.state.facebook.map(facebook => <Text style={styles.contacts} key={facebook.id} onPress={() => this.delete()} > Facebook: {facebook.value} </Text> )} */}
                    </View>
                  </ScrollView>
                </View> 

                
                {/* -------------------------------- NAV --------------------------------  */}
  

                <View style={styles.buttonContainer}>
                  <Button mode="outlined" onPress={() => navigation.navigate('Dashboard')}> HOME </Button> 
                </View>      
            </View>
          </View>
        </View>
    )
  }
}




//  -------------------------------------- Styling  --------------------------------------


const styles = StyleSheet.create({
  
  container: {
    // alignItems: 'center'
    marginBottom: 10,
  },
  body:{
    marginTop:80,
    height: 50,
    alignItems: 'center'
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
    fontWeight: "600"
  },
  contactContent: {
    // flex: 1,
    alignItems: 'center',
    height: 500,
    width: 500,
    marginTop: 10,
    marginBottom: 20
  },
  contacts:{
    fontSize:20,
    color: "#696969",
    fontWeight: "400",
    marginTop: 20
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
  centerContacts: {
    alignItems: 'center'
  }
});






// <ScrollView style={styles.scrollView}>
// <View style={styles.container}>
//     <Text style={styles.name} > Delete Contacts  </Text>
//         {this.state.phone.map(phone => <Text style={styles.contacts} key={phone.id} onPress={() => this.delete(phone.id)} > Phone: {phone.value} </Text> )}
//         {this.state.email.map(email => <Text style={styles.contacts} key={email.id} onPress={() => this.delete(email.id)} > Email: {email.value} </Text> )}
//         {this.state.website.map(website => <Text style={styles.contacts} key={website.id} onPress={() => this.delete(website.id)} > Website: {website.value} </Text> )}
//         {this.state.instagram.map(instagram => <Text style={styles.contacts} key={instagram.id} onPress={() => this.delete()} > Instagram: {instagram.value} </Text> )}
// </View>
// </ScrollView>