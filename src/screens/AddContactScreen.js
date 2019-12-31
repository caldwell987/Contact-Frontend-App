import React, { memo } from 'react';
import Button from '../components/Button';
import { TouchableOpacity, Image, StyleSheet, View, Linking, Alert, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { Container, Content, List, ListItem, Text, Input } from 'native-base';
import axios from 'axios';
import { Avatar} from 'react-native-paper';
import AddPhone from './AddPhone'
import Constants from 'expo-constants';
import BackButton from '../components/BackButton';



export default class AddContactScreen extends React.Component {
userId;
  constructor(props) {
    super(props) 
    this.state = {
      myContacts: [],
      myContactsCopy: [],
      phone: [],
      phoneValue: '',
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
      togglePhone: false,
      toggleWorkPhone: false,
      toggleHomePhone: false,
      toggleEmail: false,
      toggleWorkEmail: false,
      toggleWebsite: false,
      toggleOrganization: false,
      toggleTitle: false,
    }
     this.delete = this.delete.bind(this)
     this.sortByType = this.sortByType.bind(this)
     this.updateContacts = this.updateContacts.bind(this)
  }

  //  -------------------------------------- Contact By Type--------------------------------------


  componentDidMount() {
    const { navigation } = this.props;
    userId = navigation.getParam('userId')
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
    // console.log("delete", contactId)
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

  togglePhone() {
    this.setState({
      togglePhone: !this.state.togglePhone
    });
  }

  toggleWorkPhone() {
    this.setState({
      toggleWorkPhone: !this.state.toggleWorkPhone
    });
  }

  toggleHomePhone() {
    this.setState({
      toggleHomePhone: !this.state.toggleHomePhone
    });
  }

  toggleEmail() {
    this.setState({
      toggleEmail: !this.state.toggleEmail
    });
  }

  toggleWorkEmail() {
    this.setState({
      toggleWorkEmail: !this.state.toggleWorkEmail
    });
  }

  toggleWebsite() {
    this.setState({
      toggleWebsite: !this.state.toggleWebsite
    });
  }

  toggleOrganization() {
    this.setState({
      toggleOrganization: !this.state.toggleOrganization
    });
  }
  
  toggleTitle() {
    this.setState({
      toggleTitle: !this.state.toggleTitle
    });
  }


  updateContacts(e, toggle) {
    let contact = e
    let toggleString = 'toggle' + toggle
    this.setState({
      [toggleString]: false,
      myContacts: [...this.state.myContactsCopy, contact]
    }, () => this.sortByType() )
  }



  //  -------------------------------------- Display Info --------------------------------------

  render() {

    const { navigation } = this.props;

    return (

      <Container style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}> Contacts </Text>
        </View>

        <Content style={styles.content}>
          <List>


    {/* ---------------------------------------------- Cell Phone ----------------------------------------------  */}

              <ListItem itemDivider>
                  <Text>Phone</Text>
              </ListItem>

              {this.state.phone.map(phone => 
                <ListItem style={styles.contacts} key={phone.id} onPress={() => this.delete(phone.id)} > 
                  <TouchableOpacity onPress={() => this.delete(phone.id)} >
                    <Avatar.Icon icon="minus" size={20} />
                  </TouchableOpacity>
                  <Text>  {phone.value} </Text>
                </ListItem>)}

                {this.state.togglePhone &&
                  <AddPhone type={'Phone'} toggle={'Phone'} userId={userId} updateContacts={this.updateContacts} />
                  }

                <ListItem onPress={() => this.togglePhone()} > 
                  <Avatar.Icon icon="plus" size={20} />
                  <Text>  Add Phone </Text>
                </ListItem>

  {/* ---------------------------------------------- Work Phone ----------------------------------------------  */}

              <ListItem itemDivider>
                  <Text>Work Phone</Text>
              </ListItem>

              {this.state.workPhone.map(phone => 
                <ListItem style={styles.contacts} key={phone.id} onPress={() => this.delete(phone.id)} > 
                  <TouchableOpacity onPress={() => this.delete(phone.id)} >
                    <Avatar.Icon icon="minus" size={20} />
                  </TouchableOpacity>
                  <Text>  {phone.value} </Text>
                </ListItem>)}

                {this.state.toggleWorkPhone &&
                  <AddPhone type={'Work Phone'} toggle={'WorkPhone'} userId={userId} updateContacts={this.updateContacts} />
                  }

                <ListItem onPress={() => this.toggleWorkPhone()} > 
                  <Avatar.Icon icon="plus" size={20} />
                  <Text>  Add Work Phone </Text>
                </ListItem>


  {/* ---------------------------------------------- Home Phone ----------------------------------------------  */}


              <ListItem itemDivider>
                  <Text> Home Phone </Text>
              </ListItem>

              {this.state.homePhone.map(contact => 
                <ListItem style={styles.contacts} key={contact.id} onPress={() => this.delete(contact.id)} > 
                  <TouchableOpacity onPress={() => this.delete(contact.id)} >
                    <Avatar.Icon icon="minus" size={20} />
                  </TouchableOpacity>
                  <Text>  {contact.value} </Text>
                </ListItem>)}

                {this.state.toggleHomePhone &&
                  <AddPhone type={'Home Phone'} toggle={'HomePhone'} userId={userId} updateContacts={this.updateContacts} />
                  }

                <ListItem onPress={() => this.toggleHomePhone()} > 
                  <Avatar.Icon icon="plus" size={20} />
                  <Text>  Add Home Phone </Text>
                </ListItem>


  {/* ---------------------------------------------- Email ----------------------------------------------  */}


              <ListItem itemDivider>
                  <Text> Email </Text>
              </ListItem>

              {this.state.email.map(contact => 
                <ListItem style={styles.contacts} key={contact.id} onPress={() => this.delete(contact.id)} > 
                  <TouchableOpacity onPress={() => this.delete(contact.id)} >
                    <Avatar.Icon icon="minus" size={20} />
                  </TouchableOpacity>
                  <Text>  {contact.value} </Text>
                </ListItem>)}

                {this.state.toggleEmail &&
                  <AddPhone type={'Email'} toggle={'Email'} userId={userId} updateContacts={this.updateContacts} />
                  }

                <ListItem onPress={() => this.toggleEmail()} > 
                  <Avatar.Icon icon="plus" size={20} />
                  <Text>  Add Email </Text>
                </ListItem>


  {/* ---------------------------------------------- Work Email ----------------------------------------------  */}
  

              <ListItem itemDivider>
                  <Text> Work Email </Text>
              </ListItem>

              {this.state.workEmail.map(contact => 
                <ListItem style={styles.contacts} key={contact.id} onPress={() => this.delete(contact.id)} > 
                  <TouchableOpacity onPress={() => this.delete(contact.id)} >
                    <Avatar.Icon icon="minus" size={20} />
                  </TouchableOpacity>
                  <Text>  {contact.value} </Text>
                </ListItem>)}

                {this.state.toggleWorkEmail &&
                  <AddPhone type={'Work Email'} toggle={'WorkEmail'} userId={userId} updateContacts={this.updateContacts} />
                  }

                <ListItem onPress={() => this.toggleWorkEmail()} > 
                  <Avatar.Icon icon="plus" size={20} />
                  <Text> Add Work Email </Text>
                </ListItem>


    {/* ---------------------------------------------- Website ----------------------------------------------  */}
  

              <ListItem itemDivider>
                  <Text> Website</Text>
              </ListItem>

              {this.state.website.map(contact => 
                <ListItem style={styles.contacts} key={contact.id} onPress={() => this.delete(contact.id)} > 
                  <TouchableOpacity onPress={() => this.delete(contact.id)} >
                    <Avatar.Icon icon="minus" size={20} />
                  </TouchableOpacity>
                  <Text>  {contact.value} </Text>
                </ListItem>)}

                {this.state.toggleWebsite &&
                  <AddPhone type={'Website'} toggle={'Website'} userId={userId} updateContacts={this.updateContacts} />
                  }

                <ListItem onPress={() => this.toggleWebsite()} > 
                  <Avatar.Icon icon="plus" size={20} />
                  <Text> Add Website </Text>
                </ListItem>


  {/* ---------------------------------------------- Org ----------------------------------------------  */}
 

              <ListItem itemDivider>
                  <Text> Organization </Text>
              </ListItem>

              {this.state.organization.map(contact => 
                <ListItem style={styles.contacts} key={contact.id} onPress={() => this.delete(contact.id)} > 
                  <TouchableOpacity onPress={() => this.delete(contact.id)} >
                    <Avatar.Icon icon="minus" size={20} />
                  </TouchableOpacity>
                  <Text>  {contact.value} </Text>
                </ListItem>)}

                {this.state.toggleOrganization &&
                  <AddPhone type={'Organization'} toggle={'Organization'} userId={userId} updateContacts={this.updateContacts} />
                  }

                <ListItem onPress={() => this.toggleOrganization()} > 
                  <Avatar.Icon icon="plus" size={20} />
                  <Text> Add Organization </Text>
                </ListItem>


  {/* ---------------------------------------------- Work Email ----------------------------------------------  */}


              <ListItem itemDivider>
                  <Text> Title </Text>
              </ListItem>

              {this.state.title.map(contact => 
                <ListItem style={styles.contacts} key={contact.id} onPress={() => this.delete(contact.id)} > 
                  <TouchableOpacity onPress={() => this.delete(contact.id)} >
                    <Avatar.Icon icon="minus" size={20} />
                  </TouchableOpacity>
                  <Text>  {contact.value} </Text>
                </ListItem>)}

                {this.state.toggleTitle &&
                  <AddPhone type={'Title'} toggle={'Title'} userId={userId} updateContacts={this.updateContacts} />
                  }

                <ListItem onPress={() => this.toggleTitle()} > 
                  <Avatar.Icon icon="plus" size={20} />
                  <Text> Add Title </Text>
                </ListItem>


          </List>
        </Content>
      </Container>
     
    )
  }
}




//  -------------------------------------- Styling  --------------------------------------


const styles = StyleSheet.create({
  
  container: {
    // alignItems: 'center'
    // marginTop: 20,
  },
  input: {
    fontSize: 16,
    height: 25
  },
  content: {
    // alignItems: 'center'
    marginTop: 0,
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
    // fontSize:20,
    // color: "#696969",
    // fontWeight: "400",
    // marginTop: 20
    // marginTop: 10,
    // marginBottom: 10
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















 // <View style={styles.container}>
      //   <BackButton goBack={() => navigation.navigate('SettingsScreen')} />
      //       <View style={styles.body}>
      //         <View style={styles.bodyContent}>
      //           <View style={styles.nameContainer}>
      //           <Text style={styles.name} > Delete Contact </Text>
      //           </View>   

      //           <View style={styles.contactContent}>
      //             <ScrollView style={styles.scrollView}>
      //               <View style={styles.centerContacts} >
      //                 <Text> Phone: </Text>
      //                 {this.state.phone.map(phone => <Text style={styles.contacts} key={phone.id} onPress={() => this.delete(phone.id)} > {phone.value} </Text> )}
      //                 <Text> Work Phone: </Text>
      //                 {this.state.workPhone.map(workPhone => <Text style={styles.contacts} key={workPhone.id} onPress={() => this.delete(workPhone.id)} > {workPhone.value} </Text> )}
      //                 <Text> Home Phone: </Text>
      //                 {this.state.homePhone.map(homePhone => <Text style={styles.contacts} key={homePhone.id} onPress={() => this.delete(homePhone.id)} > {homePhone.value} </Text> )}
      //                 <Text> Personal Email: </Text>
      //                 {this.state.email.map(email => <Text style={styles.contacts} key={email.id} onPress={() => this.delete(email.id)} > {email.value} </Text> )}
      //                 <Text> Work Email: </Text>
      //                 {this.state.workEmail.map(workEmail => <Text style={styles.contacts} key={workEmail.id} onPress={() => this.delete(workEmail.id)} > {workEmail.value} </Text> )}
      //                 <Text> Website: </Text>
      //                 {this.state.website.map(website => <Text style={styles.contacts} key={website.id} onPress={() => this.delete(website.id)} > {website.value} </Text> )}
      //                 <Text> Organization: </Text>
      //                 {this.state.organization.map(organization => <Text style={styles.contacts} key={organization.id} onPress={() => this.delete(organization.id)} > {organization.value} </Text> )}
      //                 <Text> Work Title: </Text>
      //                 {this.state.title.map(title => <Text style={styles.contacts} key={title.id} onPress={() => this.delete(title.id)} > {title.value} </Text> )}
      //                 {/* <Text style={styles.contacts} key={this.state.organization.id} onPress={() => this.delete(this.state.organization.id)} > Organization: {this.state.organization.value} </Text>  */}
      //                 {/* <Text style={styles.contacts} key={this.state.title.id} onPress={() => this.delete(this.state.title.id)} > Title: {this.state.title.value} </Text>  */}
      //                 {/* {this.state.linkedIn.map(linkedIn => <Text style={styles.contacts} key={linkedIn.id} onPress={() => this.delete()} > Linkedin: {linkedIn.value} </Text> )} */}
      //                 {/* {this.state.facebook.map(facebook => <Text style={styles.contacts} key={facebook.id} onPress={() => this.delete()} > Facebook: {facebook.value} </Text> )} */}
      //               </View>
      //             </ScrollView>
      //           </View> 

                
      //           {/* -------------------------------- NAV --------------------------------  */}
  

      //           <View style={styles.buttonContainer}>
      //             <Button mode="outlined" onPress={() => navigation.navigate('Dashboard')}> HOME </Button> 
      //           </View>      
      //       </View>
      //     </View>
      //   </View>