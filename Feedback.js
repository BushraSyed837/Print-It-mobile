import * as React from 'react';
import {ActivityIndicator,View, Text,TextInput, Button,TouchableOpacity,ScrollView,StyleSheet, Picker,Checkbox} from 'react-native';
import { Ionicons, FontAwesome } from "@expo/vector-icons"; 
import AsyncStorage from '@react-native-community/async-storage';
import {  AirbnbRating } from 'react-native-elements';
import  Rating from 'react-native-easy-rating'
import firebase from 'firebase';
import { useTheme, Avatar,Title,Caption,Paragraph,Drawer,TouchableRipple,Switch,RadioButton,CheckBox} from 'react-native-paper';
import { ListItem, Icon } from 'react-native-elements';

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

export default class Feedback extends React.Component{
  constructor(props){
    super();
    this.state={
      rating:Number,
      printershop:String,
      id:String,
    }    
  }
  setRating = () => {
    console.log(this.state.printershop,this.state.rating)
    db.collection('printshops').get().then((values)=>{        
      values.docs.forEach((d)=>{        
        if(d.data().name==this.state.printershop){
          this.setState({id:(this.state.id=d.id)})
          console.log(this.state.id)
          db.collection('printshops').doc(this.state.id).update({
            feedback:this.state.rating
          }) 
          console.log('done')
         
        }
      })
    })
    
  }
  
  render(){
    return( 
    <View style={{backgroundColor:"white" ,flex:1}}>
    <ScrollView>
    <View style={{marginTop:"2%"}}><Text style={{fontFamily: "Arial",fontSize:20,textAlign:"center",fontWeight:"bold"}}>Feedback</Text></View>
    <View style={{marginTop:"2%"}}><Text style={{marginLeft:"2%",fontFamily: "",fontSize:11,textAlign:"left",fontWeight:"", fontStyle:""}}>Give Feedback According To Your Experience</Text></View>
    <ListItem bottomDivider>
      <ListItem.Content>
        <View style={{flexDirection:"row", }}> 
          <Text>Print Shop 1: </Text> 
          <View ><Rating showRating type='star' ratingCount={5} style={{marginLeft:"30%"}} imageSize={30} onRate={(rating) => {
            this.setState({printershop:(this.state.printershop='printshop1')})
            this.setState({rating:(this.state.rating=rating)})
            this.setRating()
          }}/></View>
          </View>        
      </ListItem.Content> 
    </ListItem>
    <ListItem bottomDivider>
      <ListItem.Content>
        <View style={{flexDirection:"row", }}>
          <Text>Print Shop 2: </Text>
          <View ><Rating showRating type='star' ratingCount={5} style={{marginLeft:"30%"}} imageSize={30} onRate={(rating) => {
            this.setState({printershop:(this.state.printershop='printshop2')})
            this.setState({rating:(this.state.rating=rating)})
            this.setRating()
            
          }}/></View>
          </View>       
      </ListItem.Content>
    </ListItem>
    <ListItem bottomDivider>
      <ListItem.Content>
        <View style={{flexDirection:"row", }}>
          <Text>Print Shop 3: </Text>
          <View ><Rating showRating type='star' ratingCount={5} style={{marginLeft:"30%"}} imageSize={30} onRate={(rating) => {
            this.setState({printershop:(this.state.printershop='printshop3')})
            this.setState({rating:(this.state.rating=rating)})
            this.setRating()
          }}/></View>
          </View>       
      </ListItem.Content>
    </ListItem>
    <ListItem bottomDivider>
      <ListItem.Content>
        <View style={{flexDirection:"row", }}>
          <Text>Print Shop 4: </Text>
          <View ><Rating showRating type='star' ratingCount={5} style={{marginLeft:"30%"}} imageSize={30} onRate={(rating) => {
            this.setState({printershop:(this.state.printershop='printshop4')})
            this.setState({rating:(this.state.rating=rating)})
          }}/></View> 
          </View>       
      </ListItem.Content>
    </ListItem> 
    <ListItem bottomDivider>
      <ListItem.Content>
        <View style={{flexDirection:"row", }}>
          <Text>Print Shop 5: </Text>
          <View ><Rating showRating type='star' ratingCount={5} style={{marginLeft:"30%"}} imageSize={30} onRate={(rating) => {
            this.setState({printershop:(this.state.printershop='printshop5')})
            this.setState({rating:(this.state.rating=rating)})
          }}/></View> 
          </View>        
      </ListItem.Content>
    </ListItem>
    <View><TouchableOpacity style={{padding:7,width:"25%",backgroundColor:"orange",color:"white",alignSelf:"center", marginTop:"6%"}}><Text style={{color:"white",alignText:"center",alignSelf:"center"}}
    onPress={()=>{
      this.props.navigation.navigate('Dashboard')
    }}
    >submit</Text></TouchableOpacity></View>
   </ScrollView>
    </View> 
    )
  }}