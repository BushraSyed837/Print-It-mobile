
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

  
export default class Successed extends React.Component{
  constructor(){    
    super() 
    
  } 
  
  render(){ 
    return (
      <View style={{flex:1, backgroundColor:"lightgrey",borderRadius:30,margin:10}}> 
      <View>
        <Text style={{textAlign:"center",fontSize:15,marginTop:"55%",color:"orange", fontWeight:'bold',padding:5}}>YOUR ORDER HAS BEEN PLACED</Text>
        <Text style={{textAlign:"center",fontSize:15,marginTop:"5%",color:"orange", fontWeight:'bold',padding:5}}>Thanks for visiting our shop</Text>
      </View>    
      <TouchableOpacity style={{backgroundColor:"orange",width:70,padding:5,alignSelf:"center",marginTop:"50%"}}><Text style={{color:"white",fontWeight:"bold",textAlign:"center"}} onPress={()=>{this.props.navigation.navigate("Dashboard")}}>OK</Text></TouchableOpacity>
      </View>   
    );          
  }       
} 