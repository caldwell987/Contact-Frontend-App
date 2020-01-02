import React, { memo } from 'react';
import { Button, Footer, FooterTab, Icon} from "native-base";
import IconFA from "react-native-vector-icons/FontAwesome";
import { StyleSheet } from 'react-native';

const FooterComp = ({ props }) => (
    <Footer>
        <FooterTab>
        <Button>
            <Icon name='ios-home' />
        </Button>
        <Button>
            <Icon name='md-contacts' onPress={() => props.navigation.navigation.navigate('ContactScreen', {userId: this.state.userId})}  />
        </Button>
        <Button>
            <IconFA style={styles.icon} name='plus' onPress={() => props.navigation.navigate('AddContactScreen', {userId: this.state.userId})}  />
        </Button>
        <Button>
            <Icon name='md-search' onPress={() => props.navigation.navigation.navigate('SearchScreen')} />
        </Button>
        <Button>
            <Icon name='md-settings' onPress={() => navigation.navigate('SettingsScreen')} />
        </Button>
        </FooterTab>
    </Footer>
);
  
  export default memo(FooterComp);

  const styles = StyleSheet.create({
    icon: {
      color: "#8510d8",
      fontSize: 34,
      height: 35,
      width: 35,
      overflow: "visible"
    },
  });
  