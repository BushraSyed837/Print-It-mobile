import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default class DrawerContent extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      e:"",
      name:"",
      u:""
    }
  }
  componentDidMount(){
    console.log("getting")
    AsyncStorage.getItem("email")
     .then((value)=>{
       this.setState({e:this.state.e=value})
       console.log(this.state.e)
  }) 
  AsyncStorage.getItem("username")
     .then((value)=>{
       this.setState({name:this.state.name=value})
       console.log(this.state.name)
  }) 
  AsyncStorage.getItem("photo")
     .then((value)=>{
       this.setState({u:this.state.u=value})
       console.log(this.state.u)
  }) 
  }
  didMount=()=>{
    console.log("getting")
    AsyncStorage.getItem("email")
     .then((value)=>{
       this.setState({e:this.state.e=value})
       console.log(this.state.e)
  }) 
  AsyncStorage.getItem("username")
     .then((value)=>{
       this.setState({name:this.state.name=value})
       console.log(this.state.name)
  }) 
  AsyncStorage.getItem("photo")
     .then((value)=>{
       this.setState({u:this.state.u=value})
       console.log(this.state.u)
  }) 
  }
  render() {   
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...this.props}>
          <View style={styles.drawerContent}> 
            <View style={styles.userSection}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf:"center"
                }}>

                <Avatar.Image
                  source={{ 
                    uri: this.state.u,
                  }}
                  size={70}
                /> 
              </View>
              <View style={{ alignSelf: 'center', flexDirection: 'column' }}>
                <Title style={{ color: 'orange', fontSize: 15 }}>
                  <Text style={{color: 'orange',textAlign:"center"}}>{this.state.name}</Text>
                </Title>  
              </View> 
              <View>
                <Caption style={{ alignSelf: 'center', fontSize: 17 }}>
                  <Text style={{textAlign:"center"}}>{this.state.e}</Text>
                </Caption>
              </View> 
              <Drawer.Section style={styles.drawerSection}>
                <DrawerItem
                  icon={({ color, size }) => (
                    <Ionicons name="md-home" size={26} color="orange" />
                  )} 
                  label="Dashboard"
                  onPress={() => {
                    this.props.navigation.navigate('Dashboard');
                    this.didMount()
                  }}
                />
                <DrawerItem
                  icon={({ color, size }) => (
                    <Ionicons name="md-document" size={26} color="orange" />
                  )}
                  label="Your Prints"
                  onPress={() => {
                    this.props.navigation.navigate('Your Prints');
                     this.didMount()
                  }}
                />
                <DrawerItem
                  icon={({ color, size }) => (
                    <Ionicons name="md-star" size={26} color="orange" />
                  )}
                  label="Feedback"
                  onPress={() => {
                    this.props.navigation.navigate('Feedback');
                    this.didMount()
                  }}
                />
                <DrawerItem
                  icon={({ color, size }) => (
                    <Ionicons name="md-settings" size={26} color="orange" />
                  )} 
                  label="Settings"
                  onPress={() => {
                    this.props.navigation.navigate('Settings');
                    this.didMount()
                  }}
                />
                <DrawerItem
                  icon={({ color, size }) => (
                    <Ionicons name="md-wallet" size={26} color="orange" />
                  )}
                  label="Wallet"
                  onPress={() => {
                    this.props.navigation.navigate('Wallet');
                    this.didMount()
                  }}
                />
                <DrawerItem
                  icon={({ color, size }) => (
                    <Ionicons name="md-log-out" size={26} color="orange" />
                  )}
                  label="Sign Out"
                  onPress={() => {
                     AsyncStorage.setItem("email", ('') )
                        .then(()=>{
                          console.log('email was saved successfully')
                          
                          })
                          AsyncStorage.setItem("username", ('') )
                        .then(()=>{
                          console.log('username was saved successfully')
                          })
                          AsyncStorage.setItem("photo", ('') ) 
                        .then(()=>{
                          console.log('username was saved successfully')
                          })
                            console.log("success")
                    this.props.navigation.navigate('SignIn');

                  }}
                />
              </Drawer.Section>
            </View>
          </View>
        </DrawerContentScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userSection: {
    paddingLeft: 20,
  },
  drawerSection: {
    marginTop: 15,
    maginleft: 2,
  },
});
