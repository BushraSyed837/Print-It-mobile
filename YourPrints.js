import * as React from 'react'
import {
  ActivityIndicator,
  Button,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  CheckBox
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import { Searchbar,  } from 'react-native-paper';

import AnimatedProgressWheel from 'react-native-progress-wheel';
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

export default class YourPrints extends React.Component {
  constructor(){
    super()
    this.state={
      p1:0, 
      p2:0,
      p3:0,
      s1:0,
      s2:0,
      s3:0,
      docs:[],
      payment:[] 
    } 
  }
 async componentDidMount(){
   await this.displayHistory();
   await  this.calcuatepercentage();
  }
  calcuatepercentage = async ()=>{ 
    var i = 0;
    await db.collection('printshops').get().then((values)=>{          
        values.docs.forEach((d)=>{ 
        if(d.data().name =='printshop1') {
            console.log('yes got',d.data().name) 
             d.data().requirementIds.forEach((p)=>{
                this.setState({p1:this.state.p1+=1}) 
                console.log(this.state.p1)
                i=i+1
          })}    
    }
    )})
    i=0
    await db.collection('printshops').get().then((values)=>{          
        values.docs.forEach((d)=>{ 
          if(d.data().name =='printshop2') {
            console.log('yes got',d.data().name) 
             d.data().requirementIds.forEach((p)=>{ 
             console.log(d.data().requirementIds[i])
                this.setState({p2:this.state.p2+=1})   
                console.log(this.state.p2)
                 i=i+1 
          })}    
    })})
     var j=0
    await db.collection('printshops').get().then((values)=>{          
        values.docs.forEach((d)=>{
          if(d.data().name =='printshop3') {
            console.log('yes got',d.data().name)
             d.data().requirementIds.forEach((p)=>{
               console.log(d.data().requirementIds[j]) 
                this.setState({p3:this.state.p3+=1}) 
                console.log(this.state.p3)
                 j=j+1 
          })}
    })})
     i=0 
    var shop1 = Math.ceil((this.state.p1/(this.state.p1+this.state.p2+this.state.p3))*100)
    var shop2 = Math.floor((this.state.p2/(this.state.p1+this.state.p2+this.state.p3))*100)
    var shop3 = Math.floor((this.state.p3/(this.state.p1+this.state.p2+this.state.p3))*100)
    this.setState({s1:(this.state.s1 = shop1)}) 
    this.setState({s2:(this.state.s2 = shop2)})
    this.setState({s3:(this.state.s3 = shop3)})
  }
  displayHistory = async() =>{
     await db.collection('documenthistorys').get().then((values)=>{          
        values.docs.forEach((d)=>{
            this.setState({docs:this.state.docs.concat([(d.data().docnames)])})
            this.setState({payment:this.state.payment.concat([(d.data().payment)])})

        })})
        console.log(this.state.docs)
  } 
  render() { 
    return (
      <View style={{flex:1,backgroundColor:"white"}}>
      <View style={{marginTop:"2%",backgroundColor:"white"}}><Text style={{fontFamily: "Arial",fontSize:21,textAlign:"center",fontWeight:"bold",color:"black"}}>Your Prints</Text></View> 
      <View><Text style={{marginLeft:"78%",fontWeight:"bold",backgroundColor:"white",fontSize:16, borderBottomColor:"orange",borderBottomWidth:2}}>Analytics</Text></View>  
        <View style={{marginTop:"2%",flexDirection:'row'}}>
        <View style={{padding:12}}>
        <AnimatedProgressWheel 
          size={80} 
          width={15} 
          color={'red'}
          progress={this.state.s1}
          backgroundColor={'lightgrey'}/>
        <Text style={{ fontSize: 18, fontWeight:"bold",textAlign:"center" }}>{this.state.s1+'%'}</Text>
        <Text>Print Shop 1</Text>
        </View>
        <View style={{padding:12}}> 
        <AnimatedProgressWheel 
           size={80} 
           width={15} 
           color={'green'}
           progress={this.state.s2}
           backgroundColor={'lightgrey'}/>
        <Text style={{ fontSize: 18,fontWeight:"bold", textAlign:"center" }}>{this.state.s2+'%'}</Text>
        <Text>Print Shop 2</Text>
        </View> 
        <View style={{padding:12,}}>
        <AnimatedProgressWheel 
          size={80} 
          width={15} 
          color={'blue'}
          progress={this.state.s3}
          backgroundColor={'lightgrey'}/>
        <Text style={{ fontSize: 18,textAlign:"center",fontWeight:"bold" }}>{this.state.s3+'%'}</Text>
        <Text>Print Shop 3</Text>
        </View></View>
        <View><Text style={{marginLeft:"78%",fontWeight:"bold",fontSize:16, borderBottomColor:"orange",borderBottomWidth:2}}>History</Text></View>
        <ScrollView>
        <View style={{flexDirection:"row"}}><Text style={{color:"white",padding:5,margin:"3%", textAlign:"left",backgroundColor:'orange'}}>Doc Name</Text><Text style={{color:"white",padding:5,margin:"3%",marginLeft:"40%", textAlign:"right",backgroundColor:'orange'}}>Payment</Text></View>
        <View style={{flexDirection:'row', padding:5}}><View style={{margin:"3%"}}>{this.state.docs.map((item, key) =>{return <TouchableOpacity onPress={()=>{
          AsyncStorage.setItem("item",(item) ).then(()=>{
          console.log('item was saved successfully')
          })
           this.props.navigation.navigate('history')
        }}><Text style={{color:"black"}}>{key+1}- {item}</Text></TouchableOpacity>
        })}</View> 
        <View style={{margin:"3%"}}>{this.state.payment.map((item, key) =>{return <Text style={{color:"black"}}>{item+" Rs"}</Text>
        })}</View></View>
      </ScrollView>
      </View> 
    );
  }
}