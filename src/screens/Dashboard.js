import React, { memo } from 'react';
// import Icon from 'react-native-vector-icons/Ionicons'
import { theme } from '../core/theme';
import { Avatar, Title, Paragraph } from 'react-native-paper';
// import Button from '../components/Button';
import { Share, TouchableOpacity, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import IconFA from "react-native-vector-icons/FontAwesome";
import axios from 'axios';
import AllUsers from './AllUsers'
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-navigation';
import ContactScreen from './ContactScreen';
import { Card, CardItem, Button, Content, Body, Thumbnail, Footer, FooterTab, Icon, Image} from "native-base";




export default class Dashboard extends React.Component {

  svg;

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
    // this.addedContactUpdated = this.addedContactUpdated.bind(this)
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
      
      <View style={styles.container}>

        {/* <View style={styles.header}>
          <Text style={styles.headerText}> Dashboard </Text>
          <Icon style={styles.headerIcon} onPress={() => navigation.navigate('SettingsScreen')} name="ios-settings" color="#ccc" size={30}/>
        </View> */}
            {/* <Image style={styles.avatar} source={{uri: 'https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80'}}/> */}
        <View style={styles.body}>
          <View style={styles.bodyContent}>


          <Card style={styles.mb}>
            {/* <CardItem bordered>
                <Thumbnail source={{uri: 'https://www.friendshipcircle.org/wp-content/uploads/2016/09/fake-logo.png'}} />
                <Body style={styles.cardItemBody}>
                  <Text style={styles.cardItemText}> My Contact Card </Text>
                </Body>
            </CardItem> */}

            <CardItem style={styles.cardItem}>
              <View style={styles.qrContainer}>
                <Text style={styles.cardItemText}> Scan Me </Text>
                  <TouchableOpacity >
                    <QRCode
                      value={myURL}
                      size={230}
                      color='#15317E'
                      />
                  </TouchableOpacity>
                <Text style={styles.cardItemBottomText}> Stay Connected </Text>
              </View>
            </CardItem>
          </Card>
          
          {/* <View style={styles.extraContainer}>
              <ContactScreen userId={this.state.userId} />
          </View> */}
          {/* </SafeAreaView> */}



            {/* -------------------------------- Bottom Menu --------------------------------  */}


            <Content />
                <Footer >
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
      </View>
    
    )
  }
}



//  -------------------------------------- Styling  --------------------------------------


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  icon: {
    color: "#8510d8",
    fontSize: 34,
    height: 35,
    width: 35,
    overflow: "visible"
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
    marginTop:60,
    // backgroundColor: 'red',
    justifyContent: 'center',
    // alignItems: 'center',
  },

  mb: {
    marginTop: '30%',
    marginBottom: '10%',
    marginRight: '10%',
    marginLeft: '10%',
  },

  cardItem: {
    // height: 500,
    height: 500,
    borderColor: '#8510d8',
    borderWidth: 5,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 3,
  },

  cardItemBody: {
    alignItems: 'center',
  },

  cardItemText: {
    marginBottom: 40,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#8510d8',
  },

  cardItemBottomText: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: 'bold'
  },

  qrContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: '10%',
    marginBottom: '10%'
  },

  bodyContent: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // alignItems: 'center',
    // padding:10,
    // backgroundColor: 'red',
    alignItems: 'stretch',
  },

  buttonContainer: {
    // flex: 1,
    // flexDirection: 'row',
    alignItems: 'stretch',
    marginTop:0,
    height:100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:15,
    padding: 20
  },
  button: {
    alignItems: 'stretch',
    margin: 10,
    height:100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:5,
    // borderColor: '#CFCDD7',
    // borderWidth: 1,
  },

extraContainer: {
  flex: 1,
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center',
},
qrCode: {
  backgroundColor: 'black',
},

  footer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 70,
    backgroundColor: "white",
    justifyContent: 'center',
    // alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0,
    alignItems: 'stretch',
    borderTopColor: '#DFDCEC',
    borderTopWidth: 1.5,
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
  }

});



// export default Dashboard(TabNavigator)
