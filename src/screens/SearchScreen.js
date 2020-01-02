import React, { memo } from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { Searchbar } from 'react-native-paper';
import BackButton from '../components/BackButton';


export default class Search extends React.Component {

  constructor() {
    super() 
    this.state = {
        searchValue: '',
        users: [],
        usersCopy: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    fetch('https://powerful-sea-75935.herokuapp.com/api/v1/users')
      .then(res => res.json())
      .then(json => {
        this.setState({
          usersCopy: json
        })
      });
  }

  handleChange = (e) => {

    let value = e.toLowerCase()
    let copy = this.state.usersCopy

    let filteredUsers = copy.filter(users => {
        let usersUsernameLower = users.username.toLowerCase()

        return usersUsernameLower.includes(value) 
     });

    this.setState({ 
      users: filteredUsers 
    })
  }

  userPress(userId) {
    const { navigation } = this.props;
    navigation.navigate('UserShowScreen', {userId: userId})
  }

  render() {

    const { navigation } = this.props;

    return (
    
      <View style={styles.container}>
        <BackButton goBack={() => navigation.navigate('Dashboard')} />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <View style={styles.nameContainer}>
              <Text style={styles.name} > Search For Users </Text>
              </View>   
              <Searchbar
                  placeholder="Search"
                  onChangeText={(e) => this.handleChange(e)}
              />
              <ScrollView style={styles.scrollView}>
                <View style={styles.contactContent}>
                  {this.state.users.map(user => <Text style={styles.contacts} key={user.id} onPress={() => this.userPress(user.id)} > {user.username} </Text> )}
                </View> 
              </ScrollView>
            </View>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
        marginBottom: 10,
    },
  body:{
    marginTop:80,
    height: 50,
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
