import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import AllUsers from './AllUsers'


class Dashboard extends React.Component {

  constructor() {
    super() 
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      firstName: "Please Login",
      lastName: "",
      userLoggedIn: false
    }

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout(){
    axios.delete("https://powerful-sea-75935.herokuapp.com/api/v1/logout", {withCredentials: true}).then(response => {
      this.setState ({
        loggedInStatus: "NOT_LOGGED_IN",
        user: {},
        userName: ""
      })
    })
    .catch(error => {
        console.log("Logout Error ", error)
      })  
  }

  componentDidMount() {
    // console.log(this.props.loggedInStatus)
    const { navigation } = this.props;
    let userDetails = navigation.getParam('user')
    let userLogged = navigation.getParam('loggedInStatus')

    console.log(userLogged)

    if (userLogged === "LOGGED_IN") {
      this.setState({
        loggedInStatus: "LOGGED_IN",
        user: userDetails,
        firstName: userDetails.firstname,
        lastName: userDetails.lastname,
        userLoggedIn: true
      })
      userDetails
    }
    
    else if (userLogged === "NOT_LOGGED_IN") {
      this.setState({
        loggedInStatus: "NOT_LOGGED_IN",
        user: {}
      })
    }
  }





  render() {
    
    const { navigation } = this.props;

    return (
    
      <View style={styles.container}>
        <View style={styles.header}></View>
            <Image style={styles.avatar} source={{uri: 'https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80'}}/>
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <View style={styles.nameContainer}>
                <Text style={styles.name} > {this.state.firstName} {this.state.lastName} </Text>
                </View>   

                <View style={styles.buttonContainer}>
                  <Button mode="outlined" onPress={() => navigation.navigate('HomeScreen')}> HOME </Button>
                </View>      
                <View style={styles.buttonContainer}>
                <Button mode="outlined" onPress={this.handleLogout}> LOGOUT </Button> 
                </View>           
              </View>
          </View>
        </View>
    
    )
  }
}

export default Dashboard;





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
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
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
});























// <Logo />
//       <Text>
//         {this.state.loggedInStatus}
//       </Text>
//       <Header>{this.state.userName}</Header>
//       <Paragraph>
//         Your amazing app starts here. Open you favourite code editor and start
//         editing this project.
//       </Paragraph>




    // if (userDetails.logged) {
    //   this.setState({
    //     userLoggedIn: true
    //   })
    //   // console.log("truuueee")
    // } else {
    //   // console.log(userDetails.logged_in)
    //     // navigation.navigate('HomeScreen')
    //   }


    // this.setState({
    //   userLoggedIn: userDetails.logged_in
    // })
    // console.log(this.state.userLoggedIn)