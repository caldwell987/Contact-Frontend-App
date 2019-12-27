import React, { memo } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import { theme } from '../core/theme';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import Button from '../components/Button';
import { TextInput, Image, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import axios from 'axios';
import AllUsers from './AllUsers'
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-navigation';
import ContactScreen from './ContactScreen';



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
    // this.addedContactUpdated = this.addedContactUpdated.bind(this)
    this.toggleContacts = this.toggleContacts.bind(this)
    this.toggleAddContact = this.toggleAddContact.bind(this)
    this.toggleDeleteContact = this.toggleDeleteContact.bind(this)
  }


//  -------------------------------------- Collecting User Data --------------------------------------

  componentDidMount() {
    console.log('2')
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

  //  -------------------------------------- Display Info --------------------------------------

  render() {
    console.disableYellowBox = true
    const { navigation } = this.props;
    let myURL = "https://powerful-sea-75935.herokuapp.com/connect/" + this.state.userId
    // let logoFromFile = require('../assets/PersonLogo.png');
    // console.log(myURL)
    // console.log("helllo!!!!!!!!!!!!!!!!!!!")
    // console.log(this.state.myContacts)


    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}> Dashboard </Text>
          <Icon style={styles.headerIcon} onPress={() => navigation.navigate('SettingsScreen')} name="ios-settings" color="#ccc" size={30}/>
        </View>
            {/* <Image style={styles.avatar} source={{uri: 'https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80'}}/> */}
        <View style={styles.body}>
          <View style={styles.bodyContent}>


          <Card>
            <Card.Title title="Card Title" subtitle="Card Subtitle" left={(props) => <Avatar.Icon {...props} icon="folder" />} />
          </Card>
          
          {/* <SafeAreaView> */}
          <View style={styles.qrContainer}>
            <QRCode
                value={myURL}
                size={200}
                color='#15317E'
                // backgroundColor='red'
                // logo={logoFromFile}
                // logoSize={40}
                // logoBackgroundColor='white'
                // logoBorderRadius={10}
                // logoMargin={10}
                />
          </View>

          <View style={styles.extraContainer}>
              {/* <ContactScreen userId={this.state.userId} /> */}
          </View>
          {/* </SafeAreaView> */}



            {/* -------------------------------- Bottom Menu --------------------------------  */}

            <View style={styles.footer} >

            <View style={styles.footerIcon} >
              <Icon 
                style={styles.footerContent} 
                onPress={() => navigation.navigate('Dashboard')} 
                name="ios-home" color="#ccc" size={25}

              />
            </View>


              <Icon 
                style={styles.footerContent} 
                onPress={() => navigation.navigate('ContactScreen', {userId: this.state.userId})}
                name="ios-contacts" color="#ccc" size={25}                 
              />

              <Icon style={styles.footerContent} onPress={() => navigation.navigate('SearchScreen')} name="ios-search" color="#ccc" size={25}/>
              <Icon style={styles.footerContent} onPress={this._logout} name="ios-log-out" color="#ccc" size={25}/>
              {/* <Button mode="outlined" style={styles.footerContent} onPress={this._logout}> LOGOUT </Button>  */}
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
  qrContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    // height: 200,
    // width: 200,
    // marginTop: 100,
    // borderColor: 'red',
    // borderWidth: 1,
    // marginLeft: 100,
},

extraContainer: {
  flex: 1,
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center',
  // height: 200,
  // width: 200,
  // marginTop: 100,
  // borderColor: 'red',
  // borderWidth: 1,
  // marginLeft: 100,
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
