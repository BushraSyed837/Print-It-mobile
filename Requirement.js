import * as React from 'react';
import {ActivityIndicator,View, Text,TextInput, Button,TouchableOpacity,ScrollView,StyleSheet, Pressable,Picker,Checkbox} from 'react-native';
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

export default class Req extends React.Component{ 
  constructor(props){
    super();
    this.state={
      printcolor:'Black & White Print',
      printtype:"print one sided",
      copies:"1",
      spagerange:'',
      epagerange:'',
      address:'',
      fileurl:'',
      dispatch:false,
      check:false,
      pagenumber:0,
      sname:'',
      title:''
      
    } 
  }
  componentDidMount(){
   AsyncStorage.getItem("sname").then((value)=>{
       this.setState({sname:(this.state.sname=value)})
       console.log(this.state.sname)
       }) 
       AsyncStorage.getItem("title").then((value)=>{
       this.setState({title:(this.state.title=value)})
       console.log(this.state.title)
       }) 
  }
  nextAction=()=>{
    
  AsyncStorage.setItem("printcolor",(this.state.printcolor) )
     .then(()=>{
       console.log('printcolor was saved successfully', this.state.printcolor )
      })
      AsyncStorage.setItem("printtype",(this.state.printtype) )
     .then(()=>{
       console.log('printtype was saved successfully', this.state.printtype)
      })
      AsyncStorage.setItem("copies",(this.state.copies) )
     .then(()=>{
       console.log('copies was saved successfully', this.state.copies)
      })
      AsyncStorage.setItem("epagerange",(this.state.epagerange) )
     .then(()=>{
       console.log('epagerange was saved successfully', this.state.epagerange)
      })
      AsyncStorage.setItem("spagerange",(this.state.spagerange) )
     .then(()=>{
       console.log('spagerange was saved successfully', this.state.spagerange)
      })
      AsyncStorage.setItem("address",(this.state.address) )
     .then(()=>{
       console.log('address was saved successfully', this.state.address)
      })
      AsyncStorage.setItem("dispatch",(this.state.dispatch) )
     .then(()=>{
       console.log('dispatch was saved successfully', this.state.dispatch)
      })
      this.props.navigation.navigate('EstimatedReceipt')
  }
  render(){
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
    <View style={{backgroundColor:"white" ,flex:1}}>
    
    <View style={{marginTop:"2%"}}><Text style={{fontFamily: "Arial",fontSize:22,textAlign:"center",fontWeight:"bold"}}>{this.state.title}</Text></View> 
    <View style={{alignSelf:"center", marginTop:"2%"}}>
    <Avatar.Image source={{  uri: 'https://www.printerland.co.uk/blog/wp-content/uploads/2016/12/buying-new-printer-2-1024x682.jpg' }} size={100}  />
    </View> 
     <View style={{flexDirection:"row", alignSelf:"center", padding:5,backgroundColor:"lightgrey", margin:5, borderRadius:10}}><Text style={{flexDirection:"row", alignSelf:"center",padding:10,color:"black"}}>Availablity Status                            </Text>
    <TouchableOpacity style={{backgroundColor:"green", borderRadius:10}}><Text style={{padding:10, color:"white"}}>Available</Text></TouchableOpacity></View>
     <View style={{backgroundColor:"white",borderColor:"orange",marginLeft:"20%",marginRight:"20%", padding:5}}><Text style={{alignSelf:"center",marginTop:"2%",fontWeight:"bold",fontSize:19, color:"orange" }}>Set Requirements</Text></View>
     <ScrollView>
    <View style={{flex:1,backgroundColor:"lightgrey", padding:15, borderRadius:40, margin:5}}>
     <View style={{flex:1,backgroundColor:"orange", padding:10, borderRadius:35}}>
    <Text style={{textAlign:"center",color:"white",fontWeight:"bold"}}>Fill Up Your Requirements</Text>
    <View style={{color:"white"}}>
      <View style={{flexDirection:"row", marginTop:5}}>
      <RadioButton
        value="Colored Print"
        status={ this.state.printcolor === 'colored' ? 'checked' : 'unchecked' }
        color={'black'}
        onPress = {()=>{
          this.setState({printcolor:(this.state.printcolor='colored')})
        }}
      /><Text style={{padding:6,color:"white"}}>Colored Printing</Text></View>
      <View style={{flexDirection:"row"}}>
      <RadioButton
        value="Black & White Print"
        color={'black'}
        status={ this.state.printcolor === 'Black & White Print' ? 'checked' : 'unchecked' }
        onPress = {()=>{
          this.setState({printcolor:(this.state.printcolor='Black & White Print')})

        }}
      /><Text style={{padding:6,color:"white"}}>Black & White Print</Text></View>
    </View>
    <View style={{padding:9}}>
    <Picker
          style={{height: 30, width: "96%",}}
          onValueChange ={(value)=>{
          this.setState({printtype:(this.state.printtype=value)})
          console.log(this.state.printtype)
        }}
      >
        <Picker.Item label="print one sided" value= "print one sided" />
        <Picker.Item label="print on both side" value= "print on both side" />
      </Picker></View>
      <View style={{flexDirection:"row"}}><Text style={{marginTop:"2%",marginLeft:"3%", color:"white",padding:5}}>Copies</Text><TextInput
          style={{marginTop:"2%",marginLeft:"11%",height:35, borderColor: 'lightgrey' , borderWidth: 1,marginBottom:"1%" }} 
          placeholder={" Enter Number of Copies"}
          onChangeText={(value)=>{
              this.setState({copies:(this.state.copies=value)})
           }}
          /></View>
          <View style={{flexDirection:"row"}}>
          <Text style={{marginLeft:"2%", color:"white",padding:5}}>Page Range</Text><View style={{margin:"2%"}}><TextInput
          style={{marginTop:"2%",height:35,width:70, borderColor: 'lightgrey', borderWidth: 1,marginBottom:"1%" }}
          placeholder={" Start Page"}
          value={this.state.spagerange}
          onChangeText={(value)=>{
            if(Number(this.state.spagerange)>Number(this.state.epagerange)){
                    this.setState({spagerange:(this.state.spagerange='')})
            }
              this.setState({pagerange:(this.state.spagerange=value)})
           }} 
          /></View><View style={{margin:"2%"}}><TextInput
          style={{marginTop:"2%",height:35,width:70, borderColor: 'lightgrey', borderWidth: 1,marginBottom:"1%" }}
          placeholder={" End Page"}
          value={this.state.epagerange}
          onChangeText={(values)=>{
            AsyncStorage.getItem("pagenumber") 
              .then((value)=>{ 
                this.setState({pagenumber:this.state.pagenumber=value})
                console.log(this.state.pagenumber)
            }) 
              if(Number(values)<=Number(this.state.pagenumber)){
                this.setState({epagerange:(this.state.epagerange=values)})
                if(Number(this.state.spagerange)>Number(this.state.epagerange)){
                    this.setState({spagerange:(this.state.spagerange='')})
                }
              } 
              else{
                this.setState({epagerange:(this.state.epagerange='')})
              }  
              
           }} 
          /></View></View>
          <View style={{flexDirection:"row"}}>
          <Text style={{marginLeft:"3%", color:"white",padding:2}}>Dispatch</Text>


      <RadioButton
        value="Black & White Print"
        color={'black'}
        status={ this.state.check === true ? 'checked' : 'unchecked' }
        onPress = {()=>{
          this.setState({check:(this.state.check=(!this.state.check))})
        this.setState({dispatch:(this.state.dispatch=this.state.check)})
        console.log(this.state.dispatch)
        }}
      />
          
          <TextInput
          style={{marginTop:"2%",height:35,width:140, borderColor: 'lightgrey', borderWidth: 1,marginBottom:"1%" }          }
          disabled={!this.state.dispatch}
          placeholder={"         Enter Address"}
          onChangeText={(value)=>{
              this.setState({address:(this.state.address=value)})
           }}
          /></View> 
          <View>
          <TouchableOpacity style={{margin:5,backgroundColor:"white",alignSelf:'center',flexDirection:"row",width:"25%"}} onPress={()=>{
            this.nextAction()
          }}><Text style={{padding:5,color:"black",textAlign:'center',fontWeight:'bold'}}>Next</Text></TouchableOpacity>
          </View> 
    </View>
    </View>
    </ScrollView>
    </View>
    
    )
  }}