
import * as React from 'react';
import { Text, View, StyleSheet,Image,TextInput,ScrollView,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants'; 
import { SocialIcon } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem, Icon } from 'react-native-elements';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
var firebaseConfig = {
    apiKey: "AIzaSyBncIMcSmo3pYv5rmqkEJskyZgGJSW3JUQ",
    authDomain: "fyp1-d5638.firebaseapp.com",
    projectId: "fyp1-d5638", 
    storageBucket: "fyp1-d5638.appspot.com",
    messagingSenderId: "96569574446",
    appId: "1:96569574446:web:7fa5bc7916009778840bbf",
    measurementId: "G-7Q7MVDS66X"
  };
 
const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = firebaseApp.firestore();
  
export default class Historydetails extends React.Component{
  constructor(){    
    super() 
    this.state={
      filename:'',
      details:[],
      printcolor:"",
      printtype:"",
      copies:"",
      address:"",
      username:"",
      email:"",
      

    }
  } 
  componentDidMount(){
    AsyncStorage.getItem("item")
     .then((value)=>{
       this.setState({e:this.state.filename=value})
       console.log(this.state.filename)
  }) 
     db.collection('requirements').get().then((values)=>{        
        values.docs.forEach((d)=>{        
        if(d.data().filename==this.state.filename){
          this.setState({printcolor:(this.state.printcolor=d.data().printcolor)})
          this.setState({printtype:(this.state.printtype=d.data().printtype)})
          this.setState({copies:(this.state.copies=d.data().copies)})
          this.setState({address:(this.state.address=d.data().address)})
          this.setState({email:(this.state.email=d.data().email)})
          this.setState({username:(this.state.username=d.data().username)})
        }
        })})
  }
  render(){ 
    this.props.navigation.setOptions({
      headerLeft: () => (
        <View style={{ paddingLeft: 10 }}>
          <Ionicons
            name="arrow-back"
            size={25}
            color="grey"
            onPress={() => {
              this.props.navigation.goBack(null);
            }}
          />
        </View>
      ),
    });
    return (
      <View style={{flex:1, backgroundColor:"lightgrey",borderRadius:30,margin:10}}> 
      <View>
        <Text style={{textAlign:"center",fontSize:15,marginTop:"5%",color:"orange", fontWeight:'bold',padding:5}}>History Details</Text>
      </View>   
      <View style={{padding: 3, margin:2}}>
      <ListItem bottomDivider>
                <ListItem.Content>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{padding:1, color:"orange"}}>User Name: </Text> <Text>{this.state.username}</Text>
                  </View>
                </ListItem.Content>
              </ListItem>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{padding:1, color:"orange"}}>Email: </Text><Text>{this.state.email}</Text>
                  </View>
                </ListItem.Content>
              </ListItem>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{padding:1, color:"orange"}}>File Name: </Text><Text>{this.state.filename}</Text>
                  </View>
                </ListItem.Content>
              </ListItem>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{padding:1, color:"orange"}}>Copies: </Text><Text>{this.state.copies}</Text>
                  </View>
                </ListItem.Content>
              </ListItem>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{padding:1, color:"orange"}}>Print Type: </Text><Text>{this.state.printtype}</Text>
                  </View>
                </ListItem.Content>
              </ListItem>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{padding:1, color:"orange"}}>Print Color: </Text><Text>{this.state.printcolor}</Text>
                  </View>
                </ListItem.Content>
              </ListItem>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <View style={{ flexDirection: 'row',  }}>
                    <Text style={{padding:1, color:"orange"}}>Address: </Text><Text>{this.state.address}</Text>
                  </View>
                </ListItem.Content>
              </ListItem>
      </View> 
      <TouchableOpacity style={{backgroundColor:"orange",width:70,padding:5,alignSelf:"center",marginTop:"50%"}}><Text style={{color:"white",fontWeight:"bold",textAlign:"center"}} onPress={()=>{this.props.navigation.navigate("Dashboard")}}>OK</Text></TouchableOpacity>
      </View>   
    );          
  }       
} 