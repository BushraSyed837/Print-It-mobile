import * as React from 'react';
import {ActivityIndicator,View, Text,TextInput, Button,TouchableOpacity,ScrollView,StyleSheet, Picker,Checkbox} from 'react-native';
import { Ionicons, FontAwesome } from "@expo/vector-icons"; 
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    TouchableRipple,
    Switch,
    RadioButton,
    CheckBox
} from 'react-native-paper';
import firebase from 'firebase';
import { ListItem, Icon } from 'react-native-elements'
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

export default class Setting extends React.Component{
  constructor(props){
    super();
    this.state={
      id:String,
      photo:String,
      email:String, 
      password:String,
      phonenumber:String,
      creditcard:String,
      upaisa:String,
      name:String,
      edisable:true,
      pdisable:true,
      phdisable:true,
      crdisable:true,
      udisable:true,
      ddisable:true,
      ewrite:String,
      pwrite:String, 
      cwrite:String,
      phwrite:String,
      crwrite:String, 
      uwrite:String, 
      emsg:'',
      pmsg:'',
      cmsg:'', 
      phmsg:'',
      crmsg:'', 
      umsg:'',


    }
  }
  componentDidMount(){
    AsyncStorage.getItem("username")
     .then((value)=>{ 
       this.setState({name:this.state.name=value}) 
       console.log(this.state.name)
  })  
    db.collection('customers').get().then((values)=>{         
      values.docs.forEach((d)=>{           
        if(d.data().username==this.state.name){ 
          this.setState({id:(this.state.id=d.id)})
          this.setState({name:(this.state.name=d.data().username)})
          this.setState({email:(this.state.email=d.data().email)})
          this.setState({password:(this.state.password=d.data().password)})
          this.setState({phonenumber:(this.state.phonenumber=d.data().phonenumber)})
          this.setState({creditcard:(this.state.creditcard=d.data().creditcardnumber)})
          this.setState({photourl:(this.state.photo=d.data().photourl)})
          this.setState({upaisa:(this.state.upaisa=d.data().upaisa)})

          this.setState({ewrite:(this.state.ewrite=d.data().email)})
          this.setState({pwrite:(this.state.pwrite=d.data().password)})
          this.setState({cwrite:(this.state.cwrite=d.data().password)})
          this.setState({phwrite:(this.state.phwrite=d.data().phonenumber)})
          this.setState({crwrite:(this.state.crwrite=d.data().creditcardnumber)})
          this.setState({uwrite:(this.state.uwrite=d.data().upaisa)})
        }
      }) 
    })  
  } 
  saveChanges= ()=>{  
        if(this.state.pwrite==this.state.cwrite){
          if(this.state.ewrite!='' &&this.state.pwrite!=''&&this.state.uwrite!=''&&this.state.crwrite!=''&&this.state.phwrite!=''){
            if(this.state.umsg=='' && this.state.emsg=='' && this.state.crmsg=='' && this.state.phmsg==''){
              db.collection('customers').doc(this.state.id).update({
              email:this.state.ewrite, 
              password:this.state.pwrite,
              phonenumber:this.state.phwrite,
              creditcardnumber:this.state.crwrite, 
              upaisa:this.state.uwrite
            })
            }
             
          }
          
          this.setState({email:(this.state.email=this.state.ewrite)})
          this.setState({ewrite:(this.state.ewrite='')})
          this.setState({password:(this.state.password=this.state.pwrite)})
          this.setState({pwrite:(this.state.pwrite='')})
          this.setState({phonenumber:(this.state.phonenumber=this.state.phwrite)})
          this.setState({phwrite:(this.state.phwrite='')})
          this.setState({creditcard:(this.state.creditcard=this.state.crwrite)})
          this.setState({crwrite:(this.state.crwrite='')})
          this.setState({upaisa:(this.state.upaisa=this.state.uwrite)})
          this.setState({uwrite:(this.state.uwrite='')})

          this.setState({edisable:(this.state.edisable=true)})
          this.setState({pdisable:(this.state.pdisable=true)})
          this.setState({crdisable:(this.state.crdisable=true)})
          this.setState({phdisable:(this.state.phdisable=true)})
          this.setState({udisable:(this.state.udisable=true)})

        }
        else{ 
          console.log('could not save the change as there is problem')
        } 
  }   
  setEmail = ()=>{
        this.setState({edisable:(this.state.edisable=false)})
        this.setState({ddisable:(this.state.ddisable=false)})
  }
  setPassword = ()=>{
        this.setState({pdisable:(this.state.pdisable=false)}) 
          this.setState({ddisable:(this.state.ddisable=false)})
  }
  setPhoneNumber = ()=>{
        this.setState({phdisable:(this.state.phdisable=false)})
        this.setState({ddisable:(this.state.ddisable=false)})
  }
  setCreditCard = ()=>{
       this.setState({crdisable:(this.state.crdisable=false)})
       this.setState({ddisable:(this.state.ddisable=false)})
  }
  setUpaisa = ()=>{
       this.setState({udisable:(this.state.udisable=false)})
         this.setState({ddisable:(this.state.ddisable=false)})
  }




  pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({    
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        this.setState({photo:(this.state.photo=result.uri)})
        db.collection('customers').get().then((values)=>{        
        values.docs.forEach((d)=>{          
          if(d.id==this.state.id){
              db.collection('customers').doc(this.state.id).update({
              photourl:this.state.photo
            }) 
          }  
       }) 
    })  
  }
}

  render(){
    return(
    <View style={{backgroundColor:"white" ,flex:1}}>
    <View style={{marginTop:"2%"}}><Text style={{fontFamily: "Arial",fontSize:22,textAlign:"center",fontWeight:"bold"}}>Settings</Text></View> 
    <View style={{alignSelf:"center", marginTop:"2%"}}>
    <TouchableOpacity activeOpacity="0.7"><Avatar.Image 
                                source={{
                                    uri: (this.state.photo)
                                }}
                                size={90}/><View style={{alignSelf:"center", marginTop:"-10%"}}><FontAwesome name='camera' color='orange' size={23} 
                                onPress={()=>{this.pickImage()}}/></View></TouchableOpacity>     
    
    </View> 
    <ScrollView>
    <Text style={{color:"black",fontWeight: 'bold',fontSize: 17,alignSelf:"center"}}>bushra</Text>
    <View>
        <Text style={{color:"orange",fontWeight: 'bold',fontSize: 12,margin:"4%",marginLeft:"8%"}}>Email</Text>
       <View style={{flexDirection:'row'}}> <TextInput disabled = {this.state.edisable}
          style={{margin:"8%",marginTop:"0%",height:35,width:200, borderColor: 'grey', borderWidth: 1,marginBottom:"1%" }}
          placeholder={this.state.email}
          onChangeText={(value)=>{
                let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                this.setState({ewrite:(this.state.ewrite=value)})
                if (reg.test(this.state.ewrite) == false) {
                  console.log("Email is Not Correct");
                  this.setState({ewrite:(this.state.ewrite='')})
                   this.setState({emsg:(this.state.emsg='Wrong Information')})
                }
                else {
                  console.log("Email is Correct");
                  this.setState({emsg:(this.state.emsg='')})
                  console.log(this.state.ewrite)
                }
                 this.setState({ewrite:(this.state.ewrite=value)})
           }}
          />
          <View style={{marginLeft:"2%",alignSelf:"center"}}><FontAwesome name='edit' color='orange' size={16}onPress={()=>{this.setEmail()}}/></View>
          </View>
          <Text style={{color:"red",fontWeight: 'bold',fontSize: 10,margin:"1%",marginLeft:"8%"}}>{this.state.emsg}</Text>
          <Text style={{color:"orange",fontWeight: 'bold',fontSize: 12,margin:"4%",marginLeft:"8%"}}>Password</Text>
        <View style={{flexDirection:'row'}}> <TextInput disabled = {this.state.pdisable}
          style={{margin:"8%",marginTop:"0%",height:35,width:200, borderColor: 'grey', borderWidth: 1,marginBottom:"1%" }}
          onChangeText={(value)=>{
            var passw = /^(?=.*\d)(?=.*[a-z]).{0,9}$/
            this.setState({pwrite:(this.state.pwrite=value)})
            if((this.state.pwrite).match(passw)){ 
              console.log('Correct, try another...')
              }
              else
              {  
              this.setState({pwrite:(this.state.pwrite='')})
              console.log('Wrong...!')
              }
           }}
          placeholder={this.state.password}
          /><View style={{marginLeft:"2%",alignSelf:"center"}}><FontAwesome name='edit' color='orange' size={16} onPress={()=>{this.setPassword()}} /></View>
          </View>
          <Text style={{color:"red",fontWeight: 'bold',fontSize: 10,margin:"1%",marginLeft:"8%"}}>{this.state.pmsg}</Text>
          <Text style={{color:"orange",fontWeight: 'bold',fontSize: 12,margin:"4%",marginLeft:"8%"}}>Confirm Password</Text>
        <View style={{flexDirection:'column'}}> <TextInput disabled = {this.state.pdisable}
          style={{margin:"8%",marginTop:"0%",height:35,width:200, borderColor: 'grey', borderWidth: 1,marginBottom:"1%" }}
          placeholder={this.state.password}
          onChangeText={(value)=>{
            var passw = /^(?=.*\d)(?=.*[a-z]).{0,9}$/
            this.setState({cwrite:(this.state.cwrite=value)})
            if((this.state.cwrite).match(passw)){ 
              console.log('Correct, try another...')
              this.setState({cmsg:(this.state.cmsg='')})
              }
              else
              {  
              this.setState({cwrite:(this.state.cwrite='')})
              this.setState({cmsg:(this.state.cmsg='Wrong Information')})
              console.log('Wrong...!')
              }
           }}
          
          /></View><Text style={{color:"red",fontWeight: 'bold',fontSize: 10,margin:"1%",marginLeft:"8%"}}>{this.state.cmsg}</Text>
          <Text style={{color:"orange",fontWeight: 'bold',fontSize: 12,margin:"4%",marginLeft:"8%"}}>Phone Number</Text>
        <View style={{flexDirection:'row'}}> <TextInput  keyboardType = 'numeric' disabled = {this.state.phdisable}
          style={{margin:"8%",marginTop:"0%",height:35,width:200, borderColor: 'grey', borderWidth: 1,marginBottom:"1%" }} placeholder={this.state.phonenumber}
          onChangeText ={(value)=>{
            let reg = /^\+?([0-9]{2})\)?[ . ]?([0-9]{3})[ . ]?([0-9]{3})[ . ]?([0-9]{4})$/;
                this.setState({phwrite:(this.state.phwrite=value)})
                if (reg.test(this.state.phwrite) === false) {
                  console.log("phone number is Not Correct");
                  this.setState({phwrite:(this.state.phwrite='')})
                  this.setState({phmsg:(this.state.phmsg='Wrong Information')})
                }
                else {
                  console.log("phone number is Correct");
                  console.log(this.state.phwrite)
                }   
                this.setState({phwrite:(this.state.phwrite=value)})
          }}
          /><View style={{marginLeft:"2%",alignSelf:"center"}}><FontAwesome name='edit' color='orange' size={16} onPress={()=>{this.setPhoneNumber()}}/></View></View> <Text style={{color:"red",fontWeight: 'bold',fontSize: 10,margin:"1%",marginLeft:"8%"}}>{this.state.phmsg}</Text>
          <Text style={{color:"orange",fontWeight: 'bold',fontSize: 12,margin:"4%",marginLeft:"8%"}}>Credit Card Number</Text>
        <View style={{flexDirection:'row'}}><TextInput keyboardType = 'numeric' disabled = {this.state.crdisable}
          style={{margin:"8%",marginTop:"0%",height:35, width:200,borderColor: 'grey', borderWidth: 1,marginBottom:"1%" }}
          placeholder={this.state.creditcard}
          onChangeText ={(value)=>{ 
            let reg = /^([0-9]{4})?[ . ]?([0-9]{4})[ . ]?([0-9]{4})[ . ]?([0-9]{4})$/; 
                this.setState({crwrite:(this.state.crwrite=value)})
                if (reg.test(this.state.crwrite) === false) {
                  console.log("credit card number is Not Correct");
                  this.setState({crwrite:(this.state.crwrite='')})
                  this.setState({crmsg:(this.state.crmsg='Wrong Information')})
                }
                else {
                  console.log("credit card number is Correct");
                  console.log(this.state.crwrite)
                  this.setState({crmsg:(this.state.crmsg='')})
                }   
                this.setState({crwrite:(this.state.crwrite=value)})
          }}
          /><View style={{marginLeft:"2%",alignSelf:"center"}}><FontAwesome name='edit' color='orange' size={16} onPress={()=>{this.setCreditCard()}}/></View></View><Text style={{color:"red",fontWeight: 'bold',fontSize: 10,margin:"1%",marginLeft:"8%"}}>{this.state.crmsg}</Text>
          <Text style={{color:"orange",fontWeight: 'bold',fontSize: 12,margin:"4%",marginLeft:"8%"}}>U Paisa Account Number</Text>
        <View style={{flexDirection:'row'}}><TextInput keyboardType = 'numeric' disabled = {this.state.udisable}
          style={{margin:"8%",marginTop:"0%",height:35,width:200, borderColor: 'grey', borderWidth: 1,marginBottom:"1%" }}
          placeholder={this.state.upaisa}
          onChangeText ={(value)=>{
                let reg = /^\+?([0-9]{2})\)?[ . ]?([0-9]{3})[ . ]?([0-9]{3})[ . ]?([0-9]{4})$/;
                this.setState({uwrite:(this.state.uwrite=value)})
                if (reg.test(this.state.uwrite) === false) {
                  console.log("upaisa number is Not Correct");
                  this.setState({uwrite:(this.state.uwrite='')})
                  this.setState({umsg:(this.state.umsg='Wrong Information')})
                } 
                else {
                  console.log("upaisa is Correct");
                  console.log(this.state.uwrite)
                  this.setState({umsg:(this.state.umsg='')})
                }   
                this.setState({uwrite:(this.state.uwrite=value)})
                console.log(this.state.umsg, this.state.uwrite)
          }}
          /><View style={{marginLeft:"2%",alignSelf:"center"}}><FontAwesome name='edit' color='orange' size={16}onPress={()=>{this.setUpaisa()}}/></View></View><Text style={{color:"red",fontWeight: 'bold',fontSize: 10,margin:"1%",marginLeft:"8%"}}>{this.state.umsg}</Text>
       <TouchableOpacity 
        onPress={()=>{
            this.saveChanges()
          }}
          disabled={this.state.ddisable}>
          <Text style={{borderWidth:1,alignSelf:"center",color:"white",backgroundColor:"orange",borderColor:"orange",width:"50%",textAlign:"center",margin:"5%",padding:5}} 
          >Save Changes</Text>
          </TouchableOpacity>
         </View>  
    </ScrollView> 
    </View> 
    )
  }}
