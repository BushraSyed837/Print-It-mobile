
import * as React from 'react';
import { Text, View, StyleSheet,Image,TextInput,ScrollView,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { SocialIcon } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem, Icon } from 'react-native-elements';
import { Ionicons, FontAwesome } from "@expo/vector-icons"; 
import firebase from 'firebase';

var firebaseConfig = { 
    apiKey: "AIzaSyCDMPn4E4K8tlQJ8Ij9bEK4hvsHBuzRY3M",
    authDomain: "print-it-7f9da.firebaseapp.com",
    projectId: "print-it-7f9da", 
    storageBucket: "print-it-7f9da.appspot.com",
    messagingSenderId: "752634262586",
    appId: "1:752634262586:web:122299f5b71c792dbe7103",
    measurementId: "G-XWTSC8BVXV"
  };
 
const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
const db = firebaseApp.firestore()


export default class ForgetPasswordUsername extends React.Component{
  constructor(props){
    super(props);
    this.state={
      e:String,
      email:String
    }
  }

  nextAction = () => {
    db.collection('customers').get().then((values)=>{
      values.docs.forEach((d)=>{
        if(this.state.email==d.data().email){
         AsyncStorage.setItem("id", (d.id) )
          .then(()=>{
            console.log('id was saved successfully')
       
      }) 
          AsyncStorage.setItem("phonenumber", (d.data().phonenumber) )
              .then(()=>{
                console.log(d.data().phonenumber)
                console.log('phonenumber was saved successfully')
          })
        this.props.navigation.navigate("CodeConfirmation")
        console.log("success")
        } 
        else{ 
          console.log("Incorrect Email")
        }
      })
    })
  }
  render(props){ 
    this.props.navigation.setOptions({
          headerLeft: () => <View style={{ paddingLeft: 10 }}>
            <Ionicons
              name="arrow-back"
              size={25}
              color="grey"
              onPress={() => {this.props.navigation.goBack(null)}}
            />
          </View>
   })
    return(
    <ScrollView style={{backgroundColor:"white" ,flex:1}}>
    <View style={{marginTop:"2%"}}><Text style={{fontFamily: "",fontSize:20,textAlign:"center",fontWeight:"bold"}}>Forgot Password</Text></View>
    <View style={{marginTop:"27%",marginLeft:"10%", marginRight:"10%",backgroundColor:'orange'}}>
    <View style={{marginTop:"10%"}}><Text style={{fontFamily: "",fontSize:15,color:"black",textAlign:"center",fontWeight:"bold"}}>Enter Email Address</Text></View>
    <TextInput style={{margin:"8%",marginTop:"10%",height:35, color:"white", borderColor: 'grey', borderWidth: 1,marginBottom:"50%" }} placeholder={"Enter Email Address"} onChangeText={(value)=>{
              this.setState({email:(this.state.email=value)})
           }} />
    <View><TouchableOpacity style={{padding:7,width:"25%",marginBottom:"10%",backgroundColor:"white",color:"white",alignSelf:"center",}} onPress={()=>{this.nextAction()}}><Text style={{color:"black",fontWeight:"bold",alignText:"center",alignSelf:"center"}}>Next</Text></TouchableOpacity></View>
    </View>
   </ScrollView>
    )
  }}