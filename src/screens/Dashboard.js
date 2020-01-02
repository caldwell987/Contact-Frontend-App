import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Card, CardItem, Content, Button, Footer, FooterTab, Icon} from "native-base";
import QRCode from 'react-native-qrcode-svg';
import IconFA from "react-native-vector-icons/FontAwesome";
import axios from 'axios';
import DashboardBackground from '../components/DashboardBackground';


export default class Dashboard extends React.Component {

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
     console.log('yo')
    axios.get("https://powerful-sea-75935.herokuapp.com/api/v1/user_id/" + userId, )
    .then(response => { 
      this.setState({
        myContacts: response.data.contacts,
        myContactsCopy: response.data.contacts
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


  shareQrCode = (url, fileName) => {
    fetch(url, {})
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .then(url => {
            const tag = document.createElement("a");
            tag.href = url;
            tag.download = fileName;
            document.body.appendChild(tag);
            tag.click();
            document.body.removeChild(tag);
        });
  };

  //  -------------------------------------- Display Info --------------------------------------


  render() {

    console.disableYellowBox = true
    const { navigation } = this.props;
    let myURL = "https://powerful-sea-75935.herokuapp.com/connect/" + this.state.userId

    return (
      
      <DashboardBackground>
        <View style={styles.body}>
          <View style={styles.bodyContent}>

            <Card style={styles.headerCard}>
              <CardItem style={styles.headerCardItem}>
                <Text style={styles.headerText}> {this.state.firstName} {this.state.lastName} </Text>
              </CardItem>
            </Card>

            <Card style={styles.mb}>
              <CardItem style={styles.cardItem}>
                  {/* <Text style={styles.cardItemText}> Scan Me </Text> */}
                    <TouchableOpacity >
                      <QRCode
                        value={myURL}
                        size={230}
                        color='black'
                        backgroundColor='transparent'
                      />
                    </TouchableOpacity>
                  {/* <Text style={styles.cardItemBottomText}> Stay Connected </Text> */}
              </CardItem>
            </Card>

            {/* -------------------------------- Bottom Menu --------------------------------  */}

            <Content/>
            <Footer>
              <FooterTab>
                <Button>
                  <Icon name='ios-home' />
                </Button>
                <Button>
                  <Icon name='md-contacts' onPress={() => navigation.navigate('ContactScreen', {userId: this.state.userId})}  />
                </Button>
                <Button>
                  <IconFA style={styles.icon} name='plus' onPress={() => navigation.navigate('AddContactScreen', {userId: this.state.userId})}  />
                </Button>
                <Button>
                  <Icon name='md-search' onPress={() => navigation.navigate('SearchScreen')} />
                </Button>
                <Button>
                  <Icon name='md-settings' onPress={() => navigation.navigate('SettingsScreen')} />
                </Button>
              </FooterTab>
            </Footer>
          </View>
        </View>
      </DashboardBackground>
    )
  }
}


//  -------------------------------------- Styling  --------------------------------------

const styles = StyleSheet.create({

  body:{
    flex: 8,
    marginTop:60,
  },

  bodyContent: {
    flex: 1,
  },

  headerCard: {
    marginTop: 25,
    marginBottom: 5,
    marginRight: '10%',
    marginLeft: '10%',
    borderRadius: 30,
    backgroundColor: '#00000000'
  },

  headerCardItem: {
    height: 100,
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 30,
    shadowOffset: { width: 3, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: 'white',
    // backgroundColor: '#00000000'
  },


  headerText: {
    height: 60,
    marginTop: 30,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },

  mb: {
    marginTop: '2%',
    marginBottom: '10%',
    marginRight: '10%',
    marginLeft: '10%',
    // backgroundColor: 'white',
    backgroundColor: '#00000000',
    borderRadius: 30,
  },

  cardItem: {
    height: 350,
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 30,
    shadowOffset: { width: 3, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: 'white',
    opacity: .9,
    // backgroundColor: '#00000000'
  },

  cardItemText: {
    marginBottom: 40,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },

  icon: {
    color: "#8510d8",
    fontSize: 34,
    height: 35,
    width: 35,
    overflow: "visible"
  },
});

