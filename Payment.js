import * as React from 'react';
import {ActivityIndicator,View, Text,TextInput, Button,TouchableOpacity,ScrollView,StyleSheet, Picker,Checkbox} from 'react-native';
import { Ionicons, FontAwesome } from "@expo/vector-icons"; 
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
import { ListItem, Icon } from 'react-native-elements';
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
 
const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = firebaseApp.firestore(); 
const auth = firebase.auth();

export default class Payment extends React.Component{
  constructor(props){
    super();
    this.state={
      printcolor:"",
      printtype:"",
      copies:"",
      spagerange:"",
      epagerange:"",
      address:"",
      fileurl:"",
      username:"",
      email:"",
      phonenumber:"",
      amountinWallet:0,
      printingCost:0,
      discount:0,
      deliverycost:0,
      totalamount:0,
      docname:'',
      history:{},
      } 
  }
  calculateTotalAmount=()=>{
    let res = (this.state.printingCost-(this.state.printingCost * (this.state.discount/100)))
    this.setState({totalamount:(this.state.totalamount=(res.toFixed(2)))})
  }
  async componentDidMount(){
      await AsyncStorage.getItem("filelink").then((value)=>{
       this.setState({fileurl:(this.state.fileurl=value)})
       console.log(this.state.fileurl)
      }) 
      await AsyncStorage.getItem("printingcost").then((value)=>{
          this.setState({printingCost:(this.state.printingCost = Number(value))})
          console.log("printing",this.state.printingCost)
      }) 
      await AsyncStorage.getItem("printcolor").then((value)=>{
          this.setState({printcolor:(this.state.printcolor=value)})
          console.log(this.state.printcolor)
      }) 
      await AsyncStorage.getItem("printtype").then((value)=>{
          this.setState({printtype:(this.state.printtype=value)})
          console.log(this.state.printtype)
      }) 
     await  AsyncStorage.getItem("copies").then((value)=>{
          this.setState({copies:(this.state.copies=value)})
          console.log(this.state.copies)
      }) 
     await AsyncStorage.getItem("spagerange").then((value)=>{
          this.setState({spagerange:(this.state.spagerange=value)})
          console.log(this.state.spagerange)
      }) 
      await AsyncStorage.getItem("epagerange").then((value)=>{
          this.setState({epagerange:(this.state.epagerange=value)})
          console.log(this.state.epagerange)
      }) 
     await AsyncStorage.getItem("address").then((value)=>{
          this.setState({address:(this.state.address=value)})
          console.log(this.state.address)
      })   
     await AsyncStorage.getItem("email").then((value)=>{
          this.setState({email:(this.state.email=value)})
          console.log(this.state.email)
      }) 
     await AsyncStorage.getItem("username").then((value)=>{
          this.setState({username:(this.state.username=value)})
          console.log(this.state.username)
      }) 
     await AsyncStorage.getItem("phonenumber").then((value)=>{
          this.setState({phonenumber:(this.state.phonenumber=value)})
           console.log(this.state.phonenumber)
      })
      await AsyncStorage.getItem("dispatched").then((value)=>{
          this.setState({deliverycost:(this.state.deliverycost=Number(value))})
           console.log(this.state.delivery)
      }) 
      await AsyncStorage.getItem("discount").then((value)=>{
          this.setState({discount:(this.state.discount=Number(value))})
           console.log(this.state.discount)
      }) 
      await AsyncStorage.getItem("amountinwallet").then((value)=>{
          this.setState({amountinWallet:(this.state.amountinWallet=Number(value))})
           console.log(this.state.amountinWallet)
      }) 
      await AsyncStorage.getItem("filename").then((value)=>{
          this.setState({docname:(this.state.docname=(value))})
           console.log(this.state.docname)
      }) 
      this.calculateTotalAmount();
  }
  pay = () => {
  db.collection('requirements').add({
        printcolor: this.state.printcolor,
        printtype:this.state.printtype,
        copies:this.state.copies,
        spagerange: this.state.spagerange, 
        epagerange: this.state.epagerange, 
        address: this.state.address,
        fileurl:this.state.fileurl,
        email: this.state.email, 
        username: this.state.username,
        phonenumber:this.state.phonenumber,
        filename:this.state.docname
       })
       
         db.collection('documenthistorys').add({
           docnames:this.state.docname,
           payment:this.state.totalamount
        })
   }
  render(){
    return(
    <View style={{backgroundColor:"white" ,flex:1}}>
    <View style={{marginTop:"2%"}}><Text style={{fontFamily: "Arial",fontSize:22,textAlign:"center",fontWeight:"bold"}}>Payment</Text></View> 
    <View style={{marginTop:16,backgroundColor:"", padding:3, borderRadius:5}}>
     <View style={{backgroundColor:"lightgrey", padding:2, borderRadius:5}}>
    <View style={{margin:"1%",}}>
    <ListItem bottomDivider>
      <ListItem.Content>
        <View style={{flexDirection:"row", }}>
          <Text>Printing Cost {"  "+this.state.printingCost+" Rs"}</Text></View>       
      </ListItem.Content>
    </ListItem>
    <ListItem bottomDivider>
      <ListItem.Content>
        <View style={{flexDirection:"row", }}>
          <Text>Discount {"  "+this.state.discount+" %"}</Text></View>       
      </ListItem.Content>
    </ListItem>
    <ListItem bottomDivider>
      <ListItem.Content>
        <View style={{flexDirection:"row", }}>
          <Text>Delivery Cost {"  "+this.state.deliverycost+" Rs"}</Text></View>       
      </ListItem.Content>
    </ListItem>
    <ListItem bottomDivider>
      <ListItem.Content> 
        <View style={{flexDirection:"row", }}>
          <Text>Total Amount {"  "+this.state.totalamount+" Rs"}</Text>
        </View>       
      </ListItem.Content>
    </ListItem> 
    </View>
    </View>
    </View> 
    <View style={{flexDirection:'row', margin:"2%", marginTop:"4%", borderWidth:3,borderColor:"lightgrey", borderRadius:3,padding:5}}><Text style={{color:"orange"}}>Amount in Wallet </Text><Text>{"   "+this.state.amountinWallet+ "  Rs"}</Text></View> 
    <View>
    <Picker style={{height: 30, color:"black",margin:"5%",backgroundColor:"lightgrey"}}> 
        <Picker.Item label="Select Payment Method" value="Select Payment Method" />
        <Picker.Item label="Credit Card" value="Credit Card" />
        <Picker.Item label="U Paisa" value="U Paisa" />
        <Picker.Item label="Payment on Pickup/Delivery" value="Payment on Pickup/Delivery" />
      </Picker>
    </View>
    <View><TouchableOpacity style={{padding:7,width:"25%",backgroundColor:"orange",color:"white",alignSelf:"center", marginTop:"6%"}}><Text style={{color:"white",alignText:"center",alignSelf:"center"}} onPress={()=>{
      this.pay()
      this.props.navigation.navigate('success')
    }}>Pay</Text></TouchableOpacity></View>
    </View>
    )
  }}