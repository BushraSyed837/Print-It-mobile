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
import { ListItem, Icon } from 'react-native-elements'
export default class Wallet extends React.Component{
  constructor(props){
    super();
  }
  render(){
    return(
    <View style={{backgroundColor:"white" ,flex:1}}>
    <View style={{marginTop:"2%"}}><Text style={{fontFamily: "",fontStyle:"",fontSize:20,textAlign:"center",fontWeight:"bold"}}>Wallet</Text></View>
    <View style={{marginTop:"2%"}}><Text style={{color:"orange",marginTop:30,fontFamily: "",fontSize:40,textAlign:"center",fontWeight:"bold"}}>120</Text></View>
    <View style={{marginTop:"2%"}}><Text style={{fontFamily: "",fontSize:16,textAlign:"center",fontWeight:"bold"}}>Current Balance</Text></View>
    <View style={{flexDirection: "row"}}><View><TouchableOpacity style={{padding:7,width:"100%",backgroundColor:"orange",color:"white",alignSelf:"center",marginLeft:"60%",marginTop:"7%" }}><Text style={{color:"white",alignText:"center",alignSelf:"center" ,}}>Previous Payment</Text></TouchableOpacity></View>
 
    <View><TouchableOpacity style={{padding:7,width:"100%",marginTop:"8%",marginLeft:"100%",backgroundColor:"#ed8756",color:"white",alignSelf:"center", }}><Text style={{color:"white",alignText:"center",alignSelf:"center"}}>Top-up Credit</Text></TouchableOpacity></View></View>
  
  <View style={{marginTop:"5%"}}>
  <ListItem bottomDivider topDivider>
      <ListItem.Content>
        <View style={{flexDirection:"row", }}>
          <Text>Previous Payment: 70 Rs </Text></View>       
      </ListItem.Content>
    </ListItem>
</View>
<View><Text style={{alignSelf:"left",fontWeight:"bold",padding:7,fontSize:16, color:"#ed8756"}}>Transaction History</Text></View>
        <View><Text style={{textAlign:"center",fontWeight:"bold",fontSize:16,marginTop:"10%"}}>History will be displayed here</Text></View>
    </View>
    )
  }}
  class TopupCredit extends React.Component{
  constructor(props){
    super();
  }
  render(){
    return(
    <View style={{backgroundColor:"white" ,flex:1}}>
    <ScrollView>
    <View style={{marginTop:"2%"}}><Text style={{fontFamily: "",fontStyle:"",fontSize:20,textAlign:"center",fontWeight:"bold"}}>Top up Credit</Text></View>
    <View style={{marginTop:"2%"}}><Text style={{color:"orange",marginTop:30,fontFamily: "",fontSize:40,textAlign:"center",fontWeight:"bold"}}>120</Text></View>
    <View style={{marginTop:"2%"}}><Text style={{fontFamily: "",fontSize:16,textAlign:"center",fontWeight:"bold"}}>Current Balance</Text></View>
 
  <View style={{marginTop:"5%"}}>
   <View style={{borderTopWidth:2,borderColor:"orange",padding:4,}}><TouchableOpacity><Text style={{color:'blue',fontSize:10}}>Check the credit card details</Text></TouchableOpacity></View>
  <ListItem bottomDivider topDivider> 
     
      <ListItem.Content>
        <View style={{flexDirection:"row", }}>
        <Text>Enter Amount:</Text></View>  
      </ListItem.Content>
          <TextInput
          style={{margin:"2%",marginLeft:"4%",height:35, borderColor: 'grey', borderWidth: 1,marginBottom:"1%" }}
          placeholder={""}
          />   
    </ListItem>
     <View><TouchableOpacity style={{padding:5,width:"15%",backgroundColor:"orange",color:"white",alignSelf:"center", marginTop:"6%",marginBottom:"5%"}}><Text style={{color:"white",alignText:"center",alignSelf:"center",marginBottom:"5%"}}>Pay</Text></TouchableOpacity></View>

</View>
<View style={{borderTopWidth:2,borderColor:"orange",padding:2,}}><Text style={{alignSelf:"left",fontWeight:"bold",padding:7,fontSize:14,color: "orange"}}>Transaction History</Text></View>
        <View><Text style={{textAlign:"center",fontWeight:"bold",fontSize:10,marginTop:"10%"}}>History will be displayed here</Text></View>
        </ScrollView>
    </View>
    )
  }}

class PayPreviousPayment extends React.Component{
  constructor(props){
    super();
  }
  render(){
    return(
    <View style={{backgroundColor:"white" ,flex:1}}>
    <View style={{marginTop:"2%"}}><Text style={{fontFamily: "",fontSize:18,textAlign:"center",fontWeight:"bold"}}>Pay Previous Payment</Text></View> 
    <View style={{marginTop:"5%", backgroundColor: "white",}}>
    <View  style={{marginLeft:"5%",marginTop:"1%", backgroundColor: "white",}}><Text style={{fontWeight:"bold"}}>Pay Previous Payment</Text></View>
    <ListItem bottomDivider>
      <ListItem.Content>
        <View style={{flexDirection:"row", }}>
          <Text>Total Amount </Text></View>       
      </ListItem.Content>
    </ListItem>
    <ListItem bottomDivider>
      <ListItem.Content>
        <View style={{flexDirection:"row", }}>
          <Text>Amount in Wallet  </Text></View>       
      </ListItem.Content>
    </ListItem>
        
    </View>
    <View>
    <View style={{borderTopWidth:2,borderColor:"orange",padding:4,}}><TouchableOpacity><Text style={{color:'blue',fontSize:10}}>Check the credit card details</Text></TouchableOpacity></View>
    <Picker style={{margin:"5%",backgroundColor:"grey",height: 30, width: "96%", color:"white",marginRight:"5%",}}>
        <Picker.Item label="Select Payment Method" value="Select Payment Method" />
        <Picker.Item label="Credit Card" value="Credit Card" />
        <Picker.Item label="U Paisa" value="U Paisa" />
        <Picker.Item label="Payment on Pickup/Delivery" value="Payment on Pickup/Delivery" />
      </Picker>
    </View>
    <View><TouchableOpacity style={{padding:7,width:"25%",backgroundColor:"orange",color:"white",alignSelf:"center", marginTop:"2%",marginBottom:"6%"}}><Text style={{color:"white",alignText:"center",alignSelf:"center"}}>Pay</Text></TouchableOpacity></View>
    <View style={{borderTopWidth:2,borderColor:"orange",padding:2,}}><Text style={{alignSelf:"left",fontWeight:"bold",padding:7,fontSize:14,color: "orange"}}>Transaction History</Text></View>
        <View><Text style={{textAlign:"center",fontWeight:"bold",fontSize:10,marginTop:"10%"}}>History will be displayed here</Text></View>
    </View>
    )
  }}