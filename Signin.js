
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

  
export default class SignIn extends React.Component{
  constructor(){    
    super() 
    this.state={
      email:String,
      password:Number,
      photoUrl:String,
      name:String,
      emsg:String,
      pmsg:String, 
      amountinwallet:0, 

    }
  } 
  isUserEqual = (googleUser, firebaseUser) => { 
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          return true;
        }
      }
    }
    return false;
  };
  onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInAndRetrieveDataWithCredential(credential)
            .then(function(result) {
              console.log('user signed in ');
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now()
                    
                  })
                  .then(function(snapshot) {
                    // console.log('Snapshot', snapshot);
                  });
              } else {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  });
              }
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this)
    );
  };
  googlesignIn = async() => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '862857909482-5sajjstsap3g150v9u4jdthb0410q6i5.apps.googleusercontent.com',
        behavior: 'web', 
        scopes: ['profile', 'email']
      });
      if (result.type === 'success') {
          db.collection('customers').add({
            username:result.user.name,
            email:result.user.email,
            photoUrl:result.user.photoUrl,
            pass:"0123456",
          })
        console.log(result.user.name,result.user.email,result.user.photoUrl)
        AsyncStorage.setItem("email",(result.user.email) )
        .then(()=>{
          console.log('email was saved successfully')
          
          })
          AsyncStorage.setItem("username",(result.user.name) )
        .then(()=>{
          console.log('username was saved successfully')
          })
          AsyncStorage.setItem("photo",(result.user.photoUrl) )
        .then(()=>{
          console.log('photo was saved successfully')
          })
          this.onSignIn(result);
          return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
  
  facebooklogIn= async ()=> {
  try { 
    console.log("hellop")
    await Facebook.initializeAsync({
      appId: '499166644547577',
    });
    const {
      type, 
      token, 
      expirationDate, 
      permissions,  
      declinedPermissions,  
    } = await Facebook.logInWithReadPermissionsAsync({       
      permissions: ['public_profile'],
    }); 
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            db.collection('customers').add({   
              username:data.name,
              pass:"0123456",
            })
              AsyncStorage.setItem("username",(data.name) )
                .then(()=>{
                 console.log('username was saved successfully')
              })   
          }) 
          .catch(e => console.log(e))   
       
      
        this.props.navigation.navigate("Dashboard")   
        // console.log('Logged in!', `Hi ${String((await response.json()).name)}!`); 
    }else {    
        console.log("request has been canceled") 
    } 
  } catch ({ message }) {   
    alert(`Facebook Login Error: ${message}`);
  }  
}
  signinAction=()=>{
    db.collection('customers').get().then((values)=>{
      values.docs.forEach((d)=>{
        if(d.data().email==this.state.email && d.data().password==this.state.password){
          
      AsyncStorage.setItem("email",(d.data().email) )
     .then(()=>{
       console.log('email was saved successfully')
       
      })
      AsyncStorage.setItem("amountinwallet",(d.data().amountinwallet) )
     .then(()=>{
       console.log('amountinwallet was saved successfully', d.data().amountinwallet)
      }) 
      AsyncStorage.setItem("username",(d.data().username) )
     .then(()=>{
       console.log('username was saved successfully') 
      })
      AsyncStorage.setItem("photo",(d.data().photourl) )
     .then(()=>{
       console.log('username was saved successfully')
      })
        console.log("success")
        this.props.navigation.navigate("Dashboard") 
        }
        else{
          this.setState({pmsg:(this.state.pmsg="Invaild Email or Password")})
        }
      })
    }) 
  }
  signupAction=()=>{
    this.props.navigation.navigate("SignUp") 
  }
  forgotAction=()=>{
    this.props.navigation.navigate("forgotPassword")
  } 
  render(){ 
    return (
      <View style={{flex:1, backgroundColor:"white"}}> 
        <Image style={{marginTop:"10%", alignSelf:"center"}} source={ require('../assets/Logo.PNG') }/>
        <ScrollView>
        <Text style={{color:"orange",marginLeft: 28,marginTop: 10, marginBottom: 5, fontSize: 18, fontWeight: 'bold',}}>Sign In</Text>
        <Text style={{fontStyle: 'Italic',color:"grey",marginLeft:28, fontSize: 13}}>Hi there! Nice to see you again</Text> 
         
        <View>
         
        <Text style={{color:"orange",fontWeight: 'bold',fontSize: 12,margin:"4%",marginLeft:"8%"}}>Email</Text>
        <TextInput
          style={{margin:"8%",marginTop:"0%",height:35, borderColor: 'grey', borderWidth: 1,marginBottom:"1%" }}
          placeholder={"Enter Your Email Address"}
          onChangeText={(value)=>{
              this.setState({email:(this.state.email=value)}) 
           }}
          />
          <Text style={{color:"red",fontWeight: 'bold',fontSize: 10,margin:"1%",marginLeft:"8%"}}>{this.state.emsg}</Text>
          <Text style={{color:"orange",fontWeight: 'bold',fontSize: 12,margin:"4%",marginLeft:"8%"}}>Password</Text>
        <TextInput
          style={{margin:"8%",marginTop:"0%",height:35, borderColor: 'grey', borderWidth: 1,marginBottom:"1%" }}
          placeholder={"Enter Your Password"}
          secureTextEntry={true}
          onChangeText={(value)=>{
              this.setState({password:(this.state.password=value)})
           }}
          />
          <Text style={{color:"red",fontWeight: 'bold',fontSize: 10,margin:"1%",marginLeft:"8%"}}>{this.state.pmsg}</Text>
          <TouchableOpacity 
          onPress={()=>{this.signinAction()}}
          >
          <Text style={{borderWidth:1,alignSelf:"center",color:"white",backgroundColor:"orange",borderColor:"orange",width:"50%",textAlign:"center",margin:3,padding:5}}>Sign In</Text>
          </TouchableOpacity>  
         </View> 
         <View> 
         <Text style={{alignSelf:"center", fontSize:12, marginTop:"2%"}}>or use one of your social profile</Text> 
         <View style={{flex:1,justifyContent: 'center',marginLeft: '30%',marginRight: '30%',marginTop: '10%',marginBottom: '10%',flexDirection: 'row'}}>
         <SocialIcon 
            title='Sign In With Facebook' 
            iconSize={18} 
            type='facebook'
            onPress={() =>{this.facebooklogIn()}}
          /> 
          <SocialIcon 
              title='Sign In With Gmail'   
              iconSize={18}                
              type='google' 
              onPress={() =>{this.googlesignIn()}} 
           /> 
         </View>
         <View style={{marginTop:"12%",flex:1,flexDirection:'row',justifyContent:"center"}}> 
         <TouchableOpacity onPress={()=>{this.forgotAction()}}><Text style={{fontSize:16, margin:12,marginRight:90, color:"orange"}}>Forgot Password?</Text></TouchableOpacity>
         <TouchableOpacity
         onPress={ ()=>{this.signupAction()}} 
         ><Text style={{fontSize:16, margin:12,marginLeft:30, color:"orange"}}>Sign Up</Text></TouchableOpacity> 
         </View> 
         </View>   
        </ScrollView>     
      </View>   
    );          
  }       
}      
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
