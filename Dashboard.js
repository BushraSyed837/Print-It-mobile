import * as React from 'react';
import {ActivityIndicator,Picker,ImageBackground,Button,View,Text,TouchableOpacity,ScrollView,Image,StyleSheet,FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { ListItem, Icon,Tooltip } from 'react-native-elements'
import moment from 'moment'
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

export default class Dashboard extends React.Component{ 
  constructor(){ 
    super()
    this.state={
      filter:String,
      p1:"",
      p2:"",
      p3:"",
      p4:"",
      p5:"",
      id:String,
      geodis:String,
      localdistance1:33.6518263,
      localdistance2:73.1544046,
    }    
  }
  componentDidMount(){
      this.getLocation()
    }
  getDis = (a,b) =>{
    this.getLocation()
    var distance = this.distanceBetween(a, b, (this.state.localdistance1), (this.state.localdistance2), "K");
    this.setState({geodis:(this.state.geodis=String(distance.toFixed(3)))})    
    console.log("geo dis: " + distance); 
    
  }

  distanceBetween = (lat1, lon1, lat2, lon2, unit)=> {
    var rlat1 = Math.PI * lat1 / 180
    var rlat2 = Math.PI * lat2 / 180
    var rlon1 = Math.PI * lon1 / 180
    var rlon2 = Math.PI * lon2 / 180
    var theta = lon1 - lon2
    var rtheta = Math.PI * theta / 180
    var dist = Math.sin(rlat1) * Math.sin(rlat2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.cos(rtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI 
    dist = dist * 60 * 1.1515
    if (unit == "K") {
      dist = dist * 1.609344
    }
    if (unit == "N") {
      dist = dist * 0.8684
    }
    return dist
  }

 showPosition = (position)=> {
    var geoPoint = position.coords.latitude + "," + position.coords.longitude;
    
    this.setState({localdistance1:(this.state.localdistance1=position.coords.latitude)})
    this.setState({localdistance2:(this.state.localdistance2=position.coords.longitude)})
    // Get a nice map tile from google maps
    var img_url = "http://maps.googleapis.com/maps/api/staticmap?center=" +
      geoPoint + "&zoom=14&size=400x300&sensor=false";
  }
  showError =(error)=> {
    
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("Denied the request for Geolocation. Maybe, ask the user in a more polite way?")
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.") 
        break;
      case error.TIMEOUT:
       console.log("The request to get location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred :(")
        break;
    }
  }
  getLocation=()=> {
    if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
    } else {
      console.log("Geolocation is not supported by this app.")
      
    }
  }

  setfilter =()=>{
    if(this.state.filter=='distance'){
      this.setDistance()
    }
    else if(this.state.filter=='tasks'){
      this.setTask()
    }
    else if(this.state.filter=='rating'){
      this.setRating()
    }
    else if(this.state.filter=='price'){
      this.setPrice()
    }
    else{
      console.log('error')
    }
  }
  setDistance = () =>{
    console.log('distance')
    db.collection('printshops').get().then((values)=>{        
      values.docs.forEach((d)=>{        
        if(d.data().name=='printshop1'){
          this.getDis(d.data().longitude,d.data().latitude)
          this.setState({p1:(this.state.p1=(this.state.geodis+" KM"))})
          console.log(this.state.p1)
        }
        if(d.data().name=='printshop2'){
          this.getDis(d.data().longitude,d.data().latitude)
          this.setState({p2:(this.state.p2=(this.state.geodis+" KM"))})
          console.log(this.state.p2)
        }
        if(d.data().name=='printshop3'){
          this.getDis(d.data().longitude,d.data().latitude)
           this.setState({p3:(this.state.p3=(this.state.geodis+" KM"))})
          console.log(this.state.p3)
        }
        if(d.data().name=='printshop4'){
          this.getDis(d.data().longitude,d.data().latitude)
          this.setState({p4:(this.state.p4=(this.state.geodis+" KM"))})
          console.log(this.state.p4)
        }
        if(d.data().name=='printshop5'){ 
          this.getDis(d.data().longitude,d.data().latitude)
          this.setState({p5:(this.state.p5=(this.state.geodis+" KM"))}) 
          console.log(this.state.p5)
        }
      })
    })  
  }
  setTask = () =>{
       console.log('tasks')
       db.collection('printshops').get().then((values)=>{        
      values.docs.forEach((d)=>{        
        if(d.data().name=='printshop1'){
          this.setState({p1:(this.state.p1=(d.data().tasks+' Tasks'))})
          console.log(this.state.p1)
        }
        if(d.data().name=='printshop2'){
          this.setState({p2:(this.state.p2=(d.data().tasks+' Tasks'))})
          console.log(this.state.p2)
        }
        if(d.data().name=='printshop3'){
          this.setState({p3:(this.state.p3=(d.data().tasks+' Tasks'))})
          console.log(this.state.p3)
        }
        if(d.data().name=='printshop4'){
          this.setState({p4:(this.state.p4=(d.data().tasks+' Tasks'))})
          console.log(this.state.p4)
        }
        if(d.data().name=='printshop5'){ 
          this.setState({p5:(this.state.p5=(d.data().tasks+' Tasks'))})
          console.log(this.state.p5)
        }
      })
    })  
  }
  setPrice = () =>{
      console.log('price') 
      db.collection('printshops').get().then((values)=>{        
      values.docs.forEach((d)=>{        
        if(d.data().name=='printshop1'){
          this.setState({p1:(this.state.p1=(d.data().price+' Rs/pg'))})
          console.log(this.state.p1)
        }
        if(d.data().name=='printshop2'){
          this.setState({p2:(this.state.p2=(d.data().price+' Rs/pg'))})
          console.log(this.state.p2)
        }
        if(d.data().name=='printshop3'){
          this.setState({p3:(this.state.p3=(d.data().price+' Rs/pg'))})
          console.log(this.state.p3)
        }
        if(d.data().name=='printshop4'){
          this.setState({p4:(this.state.p4=(d.data().price+' Rs/pg'))})
          console.log(this.state.p4)
        }
        if(d.data().name=='printshop5'){ 
          this.setState({p5:(this.state.p5=(d.data().price+' Rs/pg'))})
          console.log(this.state.p5)
        }
      })
    })  
  }
  setRating = ()=>{    
      console.log('rating')
      db.collection('printshops').get().then((values)=>{        
      values.docs.forEach((d)=>{        
        if(d.data().name=='printshop1'){
          this.setState({p1:(this.state.p1=(d.data().feedback+' Stars'))})
          console.log(this.state.p1)
        }
        if(d.data().name=='printshop2'){
          this.setState({p2:(this.state.p2=(d.data().feedback+' Stars'))})
          console.log(this.state.p2)
        }
        if(d.data().name=='printshop3'){
          this.setState({p3:(this.state.p3=(d.data().feedback+' Stars'))})
          console.log(this.state.p3)
        }
        if(d.data().name=='printshop4'){
          this.setState({p4:(this.state.p4=(d.data().feedback+' Stars'))})
          console.log(this.state.p4)
        }
        if(d.data().name=='printshop5'){
          this.setState({p5:(this.state.p5=(d.data().feedback+' Stars'))})
          console.log(this.state.p5)
        }
      })
    })
  }
   render() {
     const image = { uri: "https://thumbs.dreamstime.com/b/street-map-sample-streets-river-parks-44060133.jpg" };
  return (
    <View style={styles.container}>
    <ImageBackground source={image} style={styles.image}>
    <View style={{padding:"3%"}}>
    <View style={{backgroundColor:"white",marginBottom:"45%"}}>
    <Picker
        style={{padding:2,marginLeft:"2%",height: 30, width: "96%" }}
        onValueChange ={(value)=>{
          this.setState({filter:(this.state.filter=value)})
          this.setfilter()
        }}
      >
        <Picker.Item style={{color:"orange"}} label="Filter Printer Shops" value=""  />
        <Picker.Item label="Distance" value="distance"  />
        <Picker.Item label="Price" value="price" />
        <Picker.Item label="Rating" value="rating" />
        <Picker.Item label="Tasks" value="tasks" />
      </Picker>
      </View>
    <View>  
    <Text style={{fontWeight:"bold",fontSize:10,marginTop:"-20%",marginLeft:"10%"}}>Printer Shop 1</Text>  
    <TouchableOpacity style={{marginLeft:"12%",marginRight:"5%",}}><FontAwesome name="home" size={35} color="orange"
    onPress={()=>{
      AsyncStorage.setItem("sname",('printshop1') )
     .then(()=>{
       console.log('email was saved successfully')
      }) 
      this.props.navigation.navigate('printshop'); 
    }}
    /></TouchableOpacity>
    <View style={{marginBottom:"1%",marginRight:"73%",}}><Tooltip containerStyle={{backgroundColor:"white"}} height={30} width={70}  popover={<Text style={{color:"black",textAlign:"center"}}>{this.state.p1}</Text>}></Tooltip></View> 
    </View> 
    <View>
    <Text style={{fontWeight:"bold",fontSize:10, marginLeft:"70%",marginTop:"1"}}>Printer Shop 2</Text>
    <TouchableOpacity style={{marginLeft:"75%",marginTop:"1%",marginRight:"10%",}}><FontAwesome name="home" size={35} color="orange"
    onPress={()=>{
      AsyncStorage.setItem("sname",('printshop2') )
     .then(()=>{  
       console.log('email was saved successfully')
      }) 
      this.props.navigation.navigate('printshop');
    }}/></TouchableOpacity>
    <View style={{marginBottom:"1%",marginLeft:"19%"}}><Tooltip containerStyle={{backgroundColor:"white"}} height={30}  width={70}  popover={<Text style={{color:"black",textAlign:"center"}}>{this.state.p2}</Text>}></Tooltip></View>
    </View>
    <View>
    <Text style={{fontWeight:"bold",fontSize:10, marginLeft:"33%"}}>Printer Shop 3</Text>
    <TouchableOpacity style={{marginLeft:"40%",marginBottom:"1%",marginTop:"1%",marginRight:"10%",}}><FontAwesome name="home" size={35} color="orange" 
    onPress={()=>{
      AsyncStorage.setItem("sname",('printshop3') )
     .then(()=>{
       console.log('name was saved successfully')
       
      })
      this.props.navigation.navigate('printshop');
    }}

    /></TouchableOpacity>
    <View style={{marginBottom:"10%",marginRight:"14%",}}><Tooltip containerStyle={{backgroundColor:"white"}} height={30} width={70}   popover={<Text style={{color:"black",textAlign:"center"}}>{this.state.p3}</Text>}></Tooltip></View>
    </View>
    <View>
    <Text style={{fontWeight:"bold",fontSize:10, marginLeft:"1%"}}>Printer Shop 4</Text>
    <TouchableOpacity style={{marginLeft:"5%",marginRight:"1%",}}><FontAwesome name="home" size={35} color="orange"
    onPress={()=>{
      AsyncStorage.setItem("sname",('printshop4') )
     .then(()=>{
       console.log('name was saved successfully')
       
      })
      this.props.navigation.navigate('printshop');
    }}
    
    /></TouchableOpacity>
    <View style={{marginBottom:"1%",marginRight:"85%",color:"white"}}><Tooltip containerStyle={{backgroundColor:"white"}} height={30} width={70}  popover={<Text style={{color:"black",textAlign:"center"}}>{this.state.p4}</Text>}></Tooltip></View>
    </View>    
    <View>
     <Text style={{fontWeight:"bold",fontSize:10, marginLeft:"45%"}}>Printer Shop 5</Text>
    <TouchableOpacity style={{marginLeft:"50%",marginBottom:"1%",marginTop:"2%",marginRight:"10%",}}><FontAwesome name="home" size={35} color="orange" 
    onPress={()=>{
      AsyncStorage.setItem("sname",('printshop5') )
     .then(()=>{
       console.log('name was saved successfully')
       
      })
      this.props.navigation.navigate('printshop');
    }}
    
    /></TouchableOpacity>
    <View style={{marginTop:"0%",marginLeft:"2%",marginBottom:"20%"}}><Tooltip containerStyle={{backgroundColor:"white"}} height={30} width={70}  popover={<Text style={{color:"black",textAlign:"center"}}>{this.state.p5}</Text>}></Tooltip></View>
     </View>
     </View>
    </ImageBackground>
  </View>  
       );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  },
    image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});




