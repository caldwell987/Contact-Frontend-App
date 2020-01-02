import React, { memo } from 'react';
import { StyleSheet, Text, View, AsyncStorage} from 'react-native';
import { Button, Footer, FooterTab, Icon} from "native-base";
import axios from 'axios';
import IonIcon from 'react-native-vector-icons/Ionicons'
import { Avatar, Card } from 'react-native-paper';
import IconFA from "react-native-vector-icons/FontAwesome";

export default class SettingsScreen extends React.Component {

  constructor() {
    super() 
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      userId: '',
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
    this.toggleContacts = this.toggleContacts.bind(this)
    this.toggleAddContact = this.toggleAddContact.bind(this)
    this.toggleDeleteContact = this.toggleDeleteContact.bind(this)
  }

//  -------------------------------------- Collecting User Data --------------------------------------

  componentDidMount() {
    const { navigation } = this.props;
    axios.get("https://powerful-sea-75935.herokuapp.com/api/v1/logged_in", {withCredentials: true})
    .then(response => {
      if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: response.data.user,
          userId: response.data.user.id,
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
        navigation.navigate('HomeScreen');
      }
      else {
        navigation.navigate('HomeScreen')
      }
    })
    .catch(error => {
      console.log("Login Error ", error)
    })
  }

  //  -------------------------------------- Logging Out --------------------------------------

  _logout = async() => {
    const { navigation } = this.props;
    await AsyncStorage.clear()
    navigation.navigate('HomeScreen')
    this.clearSession()
  }

  clearSession() {
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
        myContactsCopy: response.data.contacts
      })
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

  //  -------------------------------------- Display Info --------------------------------------

  render() {
    const { firstName, lastName, user } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}> Settings </Text>
          <IonIcon style={styles.headerIcon} onPress={() => navigation.navigate('Dashboard')} name="ios-contact" color="#ccc" size={30}/>
        </View>

        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.bodyLargeText}>{firstName} {lastName}</Text>

            {/* -------------------------------- View Contacts --------------------------------  */}

            <Card onPress={() => navigation.navigate('AddContactScreen', {userId: this.state.userId})} >
              <Card.Title 
                title="Add Contacts" 
                subtitle="Add Contacts" 
                left={(props) => <Avatar.Icon {...props} icon="power" />} 
              />
            </Card>

            <Card onPress={() => navigation.navigate('ContactScreen', {userId: this.state.userId})} >
              <Card.Title 
                title="My Profile" 
                subtitle="See Your Connections" 
                left={(props) => <Avatar.Icon {...props} icon="account" />} 
              />
            </Card>

            <Card onPress={() => navigation.navigate('NewContactScreen', {userId: this.state.userId})} >
              <Card.Title 
                title="Edit Profile" 
                subtitle="Edit Your Details" 
                left={(props) => <Avatar.Icon {...props} icon="plus" />} 
              />
            </Card>


            <Card onPress={() => navigation.navigate('DeleteContact', {userId: this.state.userId})} >
              <Card.Title 
                title="FAQ" 
                subtitle="Frequently Asked Questions" 
                left={(props) => <Avatar.Icon {...props} icon="minus" />} 
              />
            </Card>

            <Card onPress={() => navigation.navigate('DeleteContact', {userId: this.state.userId})} >
              <Card.Title 
                title="Private Policy" 
                subtitle="View Our Private Policy" 
                left={(props) => <Avatar.Icon {...props} icon="minus" />} 
              />
            </Card>

            <Card onPress={() => navigation.navigate('DeleteContact', {userId: this.state.userId})} >
              <Card.Title 
                title="Contact Us" 
                subtitle="Have Questions or Concerns? Contact Us" 
                left={(props) => <Avatar.Icon {...props} icon="minus" />} 
              />
            </Card>

            <Card onPress={this._logout} >
              <Card.Title 
                title="Logout" 
                subtitle="Logout of App" 
                left={(props) => <Avatar.Icon {...props} icon="power" />} 
              />
            </Card>

            <View style={styles.footer} >
              <Footer>
                <FooterTab>
                  <Button>
                      <Icon name='ios-home' onPress={() => this.props.navigation.navigate('Dashboard', {userId: this.state.userId})}/>
                  </Button>
                  <Button>
                      <Icon name='md-contacts' onPress={() => this.props.navigation.navigate('ContactScreen', {userId: this.state.userId})}  />
                  </Button>
                  <Button>
                      <IconFA style={styles.icon} name='plus' onPress={() => this.props.navigation.navigate('AddContactScreen', {userId: this.state.userId})}  />
                  </Button>
                  <Button>
                      <Icon name='md-search' onPress={() => this.props.navigation.navigate('SearchScreen')} />
                  </Button>
                  <Button>
                      <Icon name='md-settings' onPress={() => this.navigation.navigate('SettingsScreen')} />
                  </Button>
                </FooterTab>
              </Footer>
            </View>
          </View>
        </View>
      </View>
    
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  header:{
    // flex: 1,
    // flexDirection: 'row',
    backgroundColor: "white",
    height:100,
    alignItems: 'center',
    borderBottomColor: '#DFDCEC',
    borderBottomWidth: 1.5,
  },

  headerText:{
    flex: 1,
    flexDirection: 'row',
    alignSelf:'center',
    position: 'absolute',
    color: "#00BFFF",
    marginTop:60,
    fontSize: 20,
    color: 'black',
    fontFamily: 'GillSans-SemiBold'
  },

  headerIcon:{
    flex: 1,
    flexDirection: 'row',
    alignSelf:'flex-end',
    marginRight: 30,
    // position: 'right',
    color: 'black',
    marginTop:55,
    height: 50
  },

  body:{
    flex: 8,
    marginTop:20,
  },

  bodyContent: {
    flex: 1,
    // flexDirection: 'row',
    alignItems: 'center',
    // padding:10,
    alignItems: 'stretch',
  },

  bodyLargeText: {
    // flex: 1,
    // flexDirection: 'row',
    fontSize: 25,
    color: 'black',
    fontFamily: 'GillSans-SemiBold',
    height:40,
    marginLeft: '5%',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:30,
  },
  bodySmallText: {
    // flex: 1,
    // flexDirection: 'row',
    fontSize: 15,
    color: 'black',
    fontFamily: 'GillSans-SemiBold',
    height:30,
    marginLeft: '5%',
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:15,
  },

  buttonContainer: {
    // flex: 1,
    // flexDirection: 'row',
    alignSelf: "flex-start",
    alignItems: 'stretch',
    marginTop:0,
    height:60,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    width: '100%',
    // alignItems: 'center',
    // marginBottom:15,
    // padding: 20
  },
  button: {
    // alignSelf: 'stretch',
    width: '100%',
    // margin: 10,
    // alignSelf: "flex-start",
    // height:40,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginBottom:0,
    // borderColor: '#CFCDD7',
    // borderWidth: 1,
  },

  footer: {
    // flex: 1,
    // flexDirection: 'row',
    width: '100%',
    // height: 70,
    // backgroundColor: "white",
    // justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0,
    backgroundColor: 'red',
    // alignItems: 'stretch',
    // borderTopColor: '#DFDCEC',

    // borderTopWidth: 1.5,
    // padding: 10,
  },

  footerContent: {
    // flex: 0,
    flexDirection: 'row',
    // padding: 20,
    marginRight: 30,
    marginLeft: 30,
    marginTop: 20,
    borderRightColor: '#DFDCEC',
    borderRightWidth: 1.5,
    alignItems: 'stretch',
    alignItems: 'center',
    height: 50,
  },
  icon: {
    color: "#8510d8",
    fontSize: 34,
    height: 35,
    width: 35,
    overflow: "visible"
  },

});


