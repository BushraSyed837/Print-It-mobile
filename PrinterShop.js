import * as React from 'react';
import {ActivityIndicator,View, Text,TextInput, Button,TouchableOpacity,ScrollView,StyleSheet, Picker,Checkbox} from 'react-native';
import { Ionicons, FontAwesome } from "@expo/vector-icons"; 
import AsyncStorage from '@react-native-community/async-storage';
import { PDFDocument } from 'pdf-lib';
import * as DocumentPicker from 'expo-document-picker';
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


export default class PrintShop extends React.Component{
  constructor(props){
    super();
    this.state={ 
      docname:String,
      sname:'', 
      availabilitystatus:'Closed',
      color:"red",
      title:"",
      p:0,
      cp:0,
      d:0,
      discount:0,
      
    }
  }
  componentDidMount(){
    AsyncStorage.getItem("sname").then((value)=>{
       this.setState({sname:this.state.sname=value})
       console.log(this.state.sname)
       }) 
       
       db.collection('printshops').get().then((values)=>{        
        values.docs.forEach((d)=>{        
        if(d.data().name==this.state.sname){
          if(d.data().availabilitystatus===true){
            this.setState({availabilitystatus:(this.state.availabilitystatus='Available')})
            this.setState({color:(this.state.color='green')})
          }
          if(this.state.sname == 'printshop1'){
          console.log('done')
            this.setState({title:(this.state.title="Print Shop 1")})
            this.setState({p:(this.state.p=d.data().price)})
            this.setState({cp:(this.state.cp=d.data().coloredprintcost)})
            this.setState({d:(this.state.d=d.data().dispatchcost)})
            this.setState({discount:(this.state.discount=d.data().discount)})
            console.log('done')
            console.log(this.state.title)
        }
        else if(this.state.sname == 'printshop2'){
           console.log('done')
            this.setState({title:(this.state.title="Print Shop 2")})
             this.setState({p:(this.state.p=d.data().price)})
            this.setState({cp:(this.state.cp=d.data().coloredprintcost)})
            this.setState({d:(this.state.d=d.data().dispatchcost)})
            this.setState({discount:(this.state.discount=d.data().discount)})
            console.log('done')
            console.log(this.state.title)
        }
        else if(this.state.sname == 'printshop3'){
           console.log('done')
            this.setState({title:(this.state.title="Print Shop 3")})
            this.setState({p:(this.state.p=d.data().price)})
            this.setState({cp:(this.state.cp=d.data().coloredprintcost)})
            this.setState({d:(this.state.d=d.data().dispatchcost)})
            this.setState({discount:(this.state.discount=d.data().discount)})
            console.log('done')
            console.log(this.state.title)
        }
        else if(this.state.sname == 'printshop4'){
           console.log('done')
            this.setState({title:(this.state.title="Print Shop 4")}) 
            this.setState({p:(this.state.p=d.data().price)})
            this.setState({cp:(this.state.cp=d.data().coloredprintcost)})
            this.setState({d:(this.state.d=d.data().dispatchcost)})
            this.setState({discount:(this.state.discount=d.data().discount)})
            console.log('done')
            console.log(this.state.title)

        }else if(this.state.sname == 'printshop5'){
           console.log('done')
            this.setState({title:(this.state.title="Print Shop 5")})
            this.setState({p:(this.state.p=d.data().price)})
            this.setState({cp:(this.state.cp=d.data().coloredprintcost)})
            this.setState({d:(this.state.d=d.data().dispatchcost)})
            this.setState({discount:(this.state.discount=d.data().discount)})
            console.log('done')
            console.log(this.state.title)
        }
        else{
          console.log('error')
        }
        }})})     
  }
  pickDocument = async () => {
	    let result = await DocumentPicker.getDocumentAsync({});
      this.setState({docname:(this.state.docname=result.name)})
      console.log(result.size)
     const pdf = await PDFDocument.load(result.uri);
      const a= pdf.getPageCount()
		  AsyncStorage.setItem("filelink",(result.uri) )
     .then(()=>{
       console.log('filelink was saved successfully')
       console.log(result.uri)
      })
      AsyncStorage.setItem("pagenumber",(a) )
     .then(()=>{
       console.log('pagenumber was saved successfully')
      })
      AsyncStorage.setItem("title",(this.state.title) )
     .then(()=>{
       console.log('title was saved successfully', this.state.title )
      })
      AsyncStorage.setItem("dispatched",(this.state.d) )
     .then(()=>{
       console.log('dispatched was saved successfully', this.state.d )
      })
      AsyncStorage.setItem("coloredcost",(this.state.cp) )
     .then(()=>{
       console.log('coloredcost was saved successfully', this.state.cp )
      })
      AsyncStorage.setItem("priced",(this.state.p) )
     .then(()=>{
       console.log('priced was saved successfully', this.state.p )
      }) 
       AsyncStorage.setItem("discount",(this.state.discount) )
     .then(()=>{
       console.log('discount was saved successfully', this.state.discount)
      })
       AsyncStorage.setItem("filename",(this.state.docname) )
     .then(()=>{
       console.log('discount was saved successfully', this.state.docname)
      })
	}
  uploadFile=()=>{ 
      this.props.navigation.navigate('Req') 
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
    <View style={{flex:1,backgroundColor:"white"}}>
    <View style={{marginTop:"2%"}}><Text style={{fontFamily: "Arial",fontSize:22,textAlign:"center",fontWeight:"bold"}}>{this.state.title}</Text></View> 
    <View style={{alignSelf:"center", marginTop:"2%"}}>
    <Avatar.Image  source={{ uri: 'https://www.printerland.co.uk/blog/wp-content/uploads/2016/12/buying-new-printer-2-1024x682.jpg' }}  size={120} />
    </View> 
    <View style={{flexDirection:"row", alignSelf:"center", padding:5,backgroundColor:"lightgrey", margin:5, borderRadius:10}}><Text style={{flexDirection:"row", alignSelf:"center",padding:10,color:"black"}}>Availablity Status                            </Text>
    <TouchableOpacity style={{backgroundColor:this.state.color, borderRadius:10}}><Text style={{padding:10, color:"white"}}>{this.state.availabilitystatus}</Text></TouchableOpacity></View> 
    <View style={{backgroundColor:"white",borderColor:"orange",marginLeft:"20%",marginRight:"20%", padding:5}}><Text style={{alignSelf:"center",marginTop:"2%",fontWeight:"bold",fontSize:19, color:"orange" }}>Upload File</Text></View>
    {this.state.availabilitystatus==="Available"?(<ScrollView>
    <View style={{flex:1,backgroundColor:"lightgrey", padding:20, borderRadius:40, margin:5}}>
     <View style={{flex:1,backgroundColor:"orange", padding:35, borderRadius:40}}>
    <View style={{alignSelf:"center",marginTop:"5%"}}><FontAwesome name="cloud-upload" size={60} color="lightgrey"/>
    </View>
    <View><TouchableOpacity style={{backgroundColor:"lightgrey", padding:8,borderRadius:6}}><Text style={{color:"black",fontSize:12,textAlign:"center"}} onPress={()=>{this.pickDocument()}}>Choose File From Your Phone</Text></TouchableOpacity></View>
    <View><Text style={{padding:3,color:"black",fontSize:12,margin:10}}>{this.state.docname}</Text></View>
    <View style={{marginLeft:"80%",marginTop:"20%"}}><TouchableOpacity style={{backgroundColor:"lightgrey", padding:3,borderRadius:6}}><Text style={{color:"black",textAlign:"center",fontSize:12, padding:1,fontWeight:'bold'}} onPress={()=>{
      this.uploadFile()
    }}>NEXT</Text></TouchableOpacity></View>
    </View> 
    </View>
    </ScrollView>):<View><Text style={{alignSelf:"center",marginTop:"2%",fontWeight:"bold",fontSize:19, color:"orange" }}>The {this.state.title} is Closed </Text></View>}
    </View>
    
    )
  }}