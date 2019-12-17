import React, { memo } from 'react';
import Button from '../components/Button';
import { TouchableOpacity, Image, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import axios from 'axios';
import AllUsers from './AllUsers'
import ContactByType from './ContactByType';
import AddNewContact from './AddNewContact';
import DeleteContact from './DeleteContact';


export default class Dashboard extends React.Component {

  constructor() {
    super() 
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      firstName: "Please Login",
      lastName: "",
      userLoggedIn: false,
      toggleContacts: false,
      toggleAddContact: false,
      toggleDeleteContact: false,
      toggleQRCode: false,
      contacts: [],
      contactsCopy: [],
      myContacts: [],
      myContactsCopy: []
    }
    this.addedContactUpdated = this.addedContactUpdated.bind(this)
    this.toggleContacts = this.toggleContacts.bind(this)
    this.toggleAddContact = this.toggleAddContact.bind(this)
    this.toggleDeleteContact = this.toggleDeleteContact.bind(this)
  }


//  -------------------------------------- Collecting User Data --------------------------------------

  componentWillMount() {
    const { navigation } = this.props;
    axios.get("https://powerful-sea-75935.herokuapp.com/api/v1/logged_in", {withCredentials: true})
    .then(response => {
      if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: response.data.user,
          firstName: response.data.user.firstname,
          lastName: response.data.user.lastname,
          userLoggedIn: true,
        }, () => this.MyContactsFunc(this.state.user.id))
      } 
      else if (!response.data.logged_in & this.state.loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        })
        navigation.navigate('Dashboard', {
          user: response.data.user,
          loggedInStatus: "LOGGED_IN"
        });
      }
    })
    .catch(error => {
      console.log("Login Error ", error)
    })
  }


  //  -------------------------------------- Logging Out --------------------------------------

  _logout = async() => {

    console.log("Dashboard - _logout")

    const { navigation } = this.props;

    await AsyncStorage.clear()
      navigation.navigate('HomeScreen')
    
      this.clearSession()
      
  }

  clearSession() {
    console.log("Dashboard - clearSession")

    axios.delete("https://powerful-sea-75935.herokuapp.com/api/v1/logout", {withCredentials: true}).then(response => {
      this.setState ({
        loggedInStatus: "NOT_LOGGED_IN",
        user: {},
        firstName: "",
        lastName: ""
      })
    })
    .catch(error => {
        console.log("Logout Error ", error)
      }) 
  }

   //  -------------------------------------- My Contacts --------------------------------------


   MyContactsFunc(userId) {
    axios.get("https://powerful-sea-75935.herokuapp.com/api/v1/user_id/" + userId, )
    .then(response => { 
      this.setState({
        myContacts: response.data.contacts,
        myContactsCopy: response.data
      })
      // console.log("Dashboard - myContactsFunc - Users Contacts", this.state.myContacts)
    })
  }


 //  -------------------------------------- Toggle --------------------------------------


  toggleContacts() {
    this.setState({
      toggleContacts: !this.state.toggleContacts
    });
  }

  toggleAddContact() {
    this.setState({
      toggleAddContact: !this.state.toggleAddContact
    });
  }

  toggleDeleteContact() {
    this.setState({
      toggleDeleteContact: !this.state.toggleDeleteContact
    });
  }

  toggleQRCode() {
    this.setState({
      toggle: "three"
    });
  };

  //  -------------------------------------- Add Contact --------------------------------------

  addedContactUpdated(contact) {
      console.log("Test Add Contact", contact)
      let contacts = this.state.myContactsCopy
      this.setState({
        toggleAddContact: !this.state.toggleAddContact,
        myContacts: [...contacts, contact]
      })
  }




  //  -------------------------------------- Display Info --------------------------------------

  render() {

    const { navigation } = this.props;

    return (


      //  -------------------------------- Header -------------------------------- 
    
      <View style={styles.container}>
        <View style={styles.header}></View>
            <Image style={styles.avatar} source={{uri: 'https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80'}}/>
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <View style={styles.nameContainer}>
                <Text style={styles.name} > {this.state.firstName} {this.state.lastName} </Text>
                </View>   

                {/* -------------------------------- View Contacts --------------------------------  */}


                { this.state.toggleContacts &&
                <View style={styles.contactContent}>
                   <ContactByType myContacts={this.state.myContacts} /> 
                </View> 
                }

                <View style={styles.buttonContainer}>
                <Button mode="outlined" onPress={this.toggleContacts}> My Contacts </Button> 
                </View> 


                {/* -------------------------------- Add New Contact --------------------------------  */}

                { this.state.toggleAddContact &&
                <View style={styles.contactContent}>
                   <AddNewContact 
                      myContacts={this.state.myContacts}
                      userId={this.state.user.id} 
                      addedContactUpdated={(e) => this.addedContactUpdated(e)}
                      /> 
                </View> 
                }

                <View style={styles.buttonContainer}>
                <Button mode="outlined" onPress={this.toggleAddContact}> Add New Contact </Button> 
                </View>   


                {/* -------------------------------- Delete Contact --------------------------------  */}


                { this.state.toggleDeleteContact &&
                <View style={styles.contactContent}>
                   <DeleteContact myContacts={this.state.myContacts} /> 
                </View> 
                }

                <View style={styles.buttonContainer}>
                <Button mode="outlined" onPress={this.toggleDeleteContact}> Delete Contact </Button> 
                </View> 


                {/* -------------------------------- NAV --------------------------------  */}
  

                <View style={styles.buttonContainer}>
                  <Button mode="outlined" onPress={() => navigation.navigate('SearchScreen')}> Search </Button>
                </View>      
                <View style={styles.buttonContainer}>
                <Button mode="outlined" onPress={this._logout}> LOGOUT </Button> 
                </View>           
              </View>
          </View>
        </View>
    
    )
  }
}


//  -------------------------------------- Styling  --------------------------------------


const styles = StyleSheet.create({
  header:{
    backgroundColor: "#0076BC",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    // flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "black",
    fontWeight: "600"
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
    marginTop:0,
    height:70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:5,
    width:250,
  },
  contactContent: {
    // flex: 1,
    alignItems: 'center',
    height: 200,
    width: 500,
    marginTop: 10,
    marginBottom: 20
  },
});
