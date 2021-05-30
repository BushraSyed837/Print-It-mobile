import * as React from 'react';
import { Text, View, StyleSheet,Image,TextInput,ScrollView,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { SocialIcon } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import { Ionicons, FontAwesome } from "@expo/vector-icons"; 
var firebaseConfig = { 
    apiKey: "AIzaSyCDMPn4E4K8tlQJ8Ij9bEK4hvsHBuzRY3M", 
    authDomain: "print-it-7f9da.firebaseapp.com",
    projectId: "print-it-7f9da",  
    storageBucket: "print-it-7f9da.appspot.com",
    messagingSenderId: "752634262586",
    appId: "1:752634262586:web:122299f5b71c792dbe7103",
    measurementId: "G-XWTSC8BVXV"
  };
 
const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = firebaseApp.firestore(); 
const auth = firebase.auth();
export default class SetPassword extends React.Component{
  constructor(props){
    super();
    this.state={
          password:String,
          cpassword:String,
          temp:String,
          id:String
    }
  }
  setAction=()=>{
    console.log('hello')
    AsyncStorage.getItem("id")
     .then((value)=>{
       this.setState({id:this.state.id=value})
       console.log(this.state.id)
  }) 
    if(this.state.password==this.state.cpassword){
      console.log('succes')
        db.collection('customers').get().then((values)=>{ 
      values.docs.forEach((d)=>{
        console.log('success`')
        if(d.id==this.state.id){ 
          db.collection('customers').doc(this.state.id).update({
            password:this.state.password
          }) 
          this.props.navigation.navigate("SignIn")
          console.log('success')
        }
      })
    })  
      console.log('success')
  }
  } 
  render(){
    return(
    <ScrollView style={{backgroundColor:"white" ,flex:1}}>
    <View style={{marginTop:"2%"}}><Text style={{fontFamily: "",fontSize:20,textAlign:"center",fontWeight:"bold"}}>Reset Password</Text></View>
    <View style={{marginTop:"27%",marginLeft:"10%", marginRight:"10%",backgroundColor:'orange'}}>
    <View style={{marginTop:"10%"}}><Text style={{fontFamily: "",fontSize:15,color:"black",textAlign:"center",fontWeight:"bold"}}>Reset Password</Text></View>
    <TextInput
          style={{margin:"8%",marginTop:"10%",height:35, color:"white", borderColor: 'grey', borderWidth: 1, }}
          placeholder={"Enter Your Password"}
          onChangeText={(value)=>{
              this.setState({password:(this.state.password=value)})
           }}
    /> 
    <TextInput
          style={{marginLeft:"8%",marginRight:"8%",height:35, color:"white", borderColor: 'grey', borderWidth: 1,marginBottom:"5%" }}l
          placeholder={"Confirm Your Password"}
          onChangeText={(value)=>{
              this.setState({cpassword:(this.state.cpassword=value)})
           }}
    />
    <View><TouchableOpacity style={{padding:7,width:"25%",marginBottom:"10%",backgroundColor:"white",color:"white",alignSelf:"center",}}><Text style={{color:"black",fontWeight:"bold",alignText:"center",alignSelf:"center"}} onPress={()=>{this.setAction()}}>set</Text></TouchableOpacity></View>
    </View>
   </ScrollView>
    )
  }}