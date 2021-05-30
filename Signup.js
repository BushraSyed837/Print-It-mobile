import * as React from 'react';
import { Text, View, StyleSheet,Image,TextInput,TouchableOpacity,ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage';
import { SocialIcon } from 'react-native-elements'
import firebase from 'firebase';

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

export default class SignUp extends React.Component{
  constructor(props){ 
    super(props) 
    this.state={
      username:String,
      email:String,
      password:String,
      cpassword:String,
      phoneNumber:String,
      emsg:String,
      pmsg:String,
      phmsg:String,
      cmsg:String,
      umsg:String,
    }
  }
  signupAction=()=>{
    
    if( this.state.emsg =='' && this.state.phmsg=='' && this.state.umsg =='' && this.state.pmsg ==''){
      if(this.state.password==this.state.cpassword){      
        db.collection('customers').add({
        username: this.state.username,
        email:this.state.email,
        password:this.state.password,
        phonenumber: this.state.phoneNumber
    })

    this.props.navigation.navigate("validatephone")
    }else{
      this.setState({cmsg:(this.state.cmsg="Password Not Matched")})
    }
    }
    else{
      if(this.state.emsg!=''){
        this.setState({emsg:(this.state.emsg="Please Enter Correct Information")})
      }
      if(this.state.phmsg!=''){
         this.setState({phmsg:(this.state.phmsg="Please Enter Correct Information")})
      }
      if(this.state.umsg!=''){
         this.setState({umsg:(this.state.umsg="Please Enter Correct Information")})
      }
    }   
  }
  signinAction=()=>{
    this.props.navigation.navigate("SignIn")
  }
  render(){
    return(
    <ScrollView style={{flex:1,backgroundColor:"white"}}>
    <Image style={{marginTop:"3%", alignSelf:"center"}} source={ require('../assets/Logo.PNG') }/> 
      <Text style={{color:"orange",marginLeft: 28,marginTop: 10, marginBottom: 5, fontSize: 18, fontWeight: 'bold',}}>Sign Up</Text>
              <Text style={{fontStyle: 'Italic',color:"grey",marginLeft:28, fontSize: 13}}>Please fill up below fields for sign up</Text>
    <View>
        <Text style={{color:"orange",fontWeight: 'bold',fontSize: 12,margin:"4%",marginLeft:"8%"}}>Username</Text>
        <TextInput
          style={{margin:"8%",marginTop:"0%",height:35, borderColor: 'grey', borderWidth: 1,marginBottom:"1%" }}
          placeholder={"Enter Your Username"}
          onChangeText={(value)=>{
              this.setState({umsg:(this.state.umsg='')})
              this.setState({username:(this.state.username=value)})
              console.log(this.state.umsg,this.state.username)
              }}
          />
          <Text style={{color:"red",fontWeight: 'bold',fontSize: 10,margin:"1%",marginLeft:"8%"}}>{this.state.umsg}</Text>
          <Text style={{color:"orange",fontWeight: 'bold',fontSize: 12,margin:"4%",marginLeft:"8%"}}>Email</Text>
        <TextInput
          style={{margin:"8%",marginTop:"0%",height:35, borderColor: 'grey', borderWidth: 1,marginBottom:"1%" }}
          placeholder={"Enter Your Email Address"}
          onChangeText={(value)=>{
                this.setState({emsg:(this.state.emsg='')})
                let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                this.setState({email:(this.state.email=value)})
                if (reg.test(this.state.email) == false) {
                  console.log("Email is Not Correct"); 
                  this.setState({emsg:(this.state.emsg='Wrong Email')}) 
                }
                else {
                  console.log("Email is Correct");
                  console.log(this.state.email)
                }
                this.setState({email:(this.state.email=value)})
                this.setState({emsg:(this.state.emsg='')})
                console.log(this.state.emsg,this.state.email)
               }}/>
          <Text style={{color:"red",fontWeight: 'bold',fontSize: 10,margin:"1%",marginLeft:"8%"}}>{this.state.emsg}</Text>
          <Text style={{color:"orange",fontWeight: 'bold',fontSize: 12,margin:"4%",marginLeft:"8%"}}>Password</Text>
        <TextInput
          style={{margin:"8%",marginTop:"0%",height:35, borderColor: 'grey', borderWidth: 1,marginBottom:"1%" }}
          placeholder={"Enter Your Password"}
          secureTextEntry={true}
          onChangeText={(value)=>{
            var passw = /^(?=.*\d)(?=.*[a-z]).{0,9}$/
            this.setState({password:(this.state.password=value)})
            if((this.state.password).match(passw)){ 
              console.log('Correct, try another...')
              this.setState({pmsg:(this.state.pmsg='')})
              console.log(this.state.pmsg,this.state.password)
              }
              else
              {  
              this.setState({password:(this.state.password='')})
              this.setState({pmsg:(this.state.pmsg='Wrong Password')})
              console.log('Wrong...!')
              }
           }} 
          />
          <Text style={{color:"red",fontWeight: 'bold',fontSize: 10,margin:"1%",marginLeft:"8%"}}>{this.state.pmsg}</Text>
          <Text style={{color:"orange",fontWeight: 'bold',fontSize: 12,margin:"4%",marginLeft:"8%"}}>Confirm Password</Text>
        <TextInput
          style={{margin:"8%",marginTop:"0%",height:35, borderColor: 'grey', borderWidth: 1,marginBottom:"1%" }}
          placeholder={"Re-write Your Password"}
          secureTextEntry={true}
         onChangeText={(value)=>{
            var passw = /^(?=.*\d)(?=.*[a-z]).{0,9}$/
            this.setState({cpassword:(this.state.cpassword=value)})
            if((this.state.cpassword).match(passw)){ 
              console.log('Correct, try another...')
              this.setState({cmsg:(this.state.cmsg='')})
              console.log(this.state.cmsg,this.state.cpassword)
              }
              else
              {  
              this.setState({cpassword:(this.state.cpassword='')})
              this.setState({cmsg:(this.state.cmsg='Wrong Password')})
              }
           }}
          />
          <Text style={{color:"red",fontWeight: 'bold',fontSize: 10,margin:"1%",marginLeft:"8%"}}>{this.state.cmsg}</Text>
          <Text style={{color:"orange",fontWeight: 'bold',fontSize: 12,margin:"4%",marginLeft:"8%"}}>Phone Number</Text>
        <TextInput
          style={{margin:"8%",marginTop:"0%",height:35, borderColor: 'grey', borderWidth: 1,marginBottom:"1%" }}
          placeholder={"Enter Your Phone Number"}
          keyboardType = 'numeric'
          onChangeText={(value)=>{
            let reg = /^\+?([0-9]{2})\)?[ . ]?([0-9]{3})[ . ]?([0-9]{3})[ . ]?([0-9]{4})$/;
                this.setState({phonenumber:(this.state.phonenumber=value)})
                if (reg.test(this.state.phonenumber) === false) {
                  console.log("phone number is Not Correct");
                  this.setState({phonenumber:(this.state.phonenumber='')})
                  this.setState({phmsg:(this.state.phmsg='Wrong Information')})
                }
                else {
                  console.log("phone number is Correct"); 
                  console.log(this.state.phonenumber)
                }              
            this.setState({phoneNumber:(this.state.phoneNumber=(value))})
            console.log(this.state.phmsg,this.state.phoneNumber)
            this.setState({phmsg:(this.state.phmsg='')})
            AsyncStorage.setItem("phone",(this.state.phoneNumber) ).then(()=>{
          console.log('phone was saved successfully')
          })
           }}
          />
          <Text style={{color:"red",fontWeight: 'bold',fontSize: 10,margin:"1%",marginLeft:"8%"}}>{this.state.phmsg}</Text>
          <TouchableOpacity onPress={()=>{this.signupAction ()}} > 
          <Text style={{borderWidth:1,alignSelf:"center",color:"white",backgroundColor:"orange",borderColor:"orange",width:"50%",textAlign:"center",margin:3,padding:5}}>Sign Up</Text>
          </TouchableOpacity>
         </View>
         <View style={{flex:1,flexDirection:'row' ,justifyContent:"center"}}>
         <Text style={{fontSize:12, margin:10,}}>Have an Account?</Text>
         <TouchableOpacity onPress={()=>{this.signinAction()}}><Text style={{fontSize:12, margin:10, color:"orange"}}>Sign In</Text></TouchableOpacity>
         </View> 
    </ScrollView>
    )
  }
}
