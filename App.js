import * as React from 'react';
import { View, Text, Button, StyleSheet,Image,TextInput,ScrollView,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,DrawerContentScrollView, } from '@react-navigation/drawer';
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar,Tooltip } from 'react-native-elements';
import { SocialIcon } from 'react-native-elements' 
import Dashboard from "./screens/Dashboard"; 
import Setting from "./screens/Settings";  
import YourPrints from "./screens/YourPrints";
import SignIn from "./screens/Signin"; 
import SignUp from "./screens/Signup"; 
import Feedback from "./screens/Feedback";  
import Wallet from "./screens/Wallet"; 
import DrawerContent from "./screens/Drawer";
import ForgetPasswordUsername from "./screens/ForgotPassword";
import Apped from "./screens/CodeConfirmation";
import SetPassword from "./screens/SetPassword";
import PrintShop from "./screens/PrinterShop";
import Req from "./screens/Requirement"
import EstimatedReceipt from "./screens/EstimatedReceipt" 
import Payment from "./screens/Payment"
import Successed from "./screens/Success"
import Historydetails from "./screens/Historydetails"
import Apps from "./screens/ValidatePhone";
const Drawer = createDrawerNavigator();   

// Drawer Navigation Starts

class MyDrawer extends React.Component {   
  constructor(props){  
    super(props) 
       
  }
  render(){
    return (    
    <Drawer.Navigator drawerType="slide" drawerStyle={{width: 230,}}
    drawerContent={props=>  <DrawerContent {...props}/>}
    drawerContentOptions={{
      activeTintColor: 'orange',
      itemStyle: { marginVertical: 5 },
    }}   
    >
    <Drawer.Screen    
          name="SignIn"
          component={StackNavigator1}
          options={{
            drawerLabel: "SignIn",
    }}/>
    <Drawer.Screen    
          name="Dashboard"
          component={StackNavigator2}
          options={{
            drawerLabel: "Dashboard", 
        }}/>
    
    <Drawer.Screen
          name="Your Prints"
          component={StackNavigator3}
          options={{
              drawerLabel: "Your Prints",
          }}/>
    
   
    
    <Drawer.Screen
          name="Settings"
          component={StackNavigator4}
          options={{
            drawerLabel: "Settings",
          }}/>
          <Drawer.Screen
          name="Feedback"
          component={StackNavigator5}
          options={{
              drawerLabel: "Feedback",
          }}/> 
    <Drawer.Screen
          name="Wallet"
          component={StackNavigator6}
          options={{
              drawerLabel: "Wallet",
          }}/> 
        
    </Drawer.Navigator>

    );
}}
// Drawer Navigation ends
const Stack1 = createStackNavigator();// stack variable for stacknavigation screen 1
const Stack2 = createStackNavigator();// stack variable for stacknavigation screen 2
const Stack3 = createStackNavigator();// stack variable for stacknavigation screen 3
const Stack4 = createStackNavigator();// stack variable for stacknavigation screen 4
const Stack5 = createStackNavigator();// stack variable for stacknavigation screen 5
const Stack6 = createStackNavigator();// stack variable for stacknavigation screen 6
const Stack7 = createStackNavigator();// stack variable for stacknavigation screen 7
//StackNavigation for world Stats

class StackNavigator1 extends React.Component {
  render(){
    return (     
    <Stack1.Navigator    
      screenOptions={{   
        headerTitleAlign:"center",              
         headerTintColor:"grey",
         headerStyle:{ 
           backgroundColor:"orange",
           borderWidth:2,  
          borderColor:"#fff", 
         },
        headerLeft: () =>    
          <View style={{ paddingLeft: 10 }}>
            
          </View>
      }}> 
      
     <Stack1.Screen    
        name="SignIn"    
        component={SignIn}
        options={{         
          title: 'Print It',           
        }} 
      />
       
      <Stack1.Screen    
        name="SignUp"    
        component={SignUp}
        options={{         
          title: 'Print It',           
        }}
      />
      <Stack1.Screen    
        name="validatephone"    
        component={Apps}
        options={{         
          title: 'Print It',           
        }}
      />  
      <Stack1.Screen    
        name="forgotPassword"    
        component={ForgetPasswordUsername}
        options={{         
          title: 'Print It',           
        }}
      />
      
      <Stack1.Screen    
        name="CodeConfirmation"    
        component={Apped}
        options={{         
          title: 'Print It',           
        }}
      />
      <Stack1.Screen    
        name="SetPassword"    
        component={SetPassword}
        options={{         
          title: 'Print It',           
        }}
      />
    </Stack1.Navigator>   
  )   
}}
// Stack Navigation for "country stats" and "country detail".
class StackNavigator2 extends React.Component {
  render(){
    return (
      <Stack2.Navigator
      screenOptions={{
        headerTitleAlign:"center",
         headerTintColor:"grey",
         headerStyle:{
           backgroundColor:"orange",
           borderWidth:2,
          borderColor:"#fff",
         },
        headerLeft: () =>
          <View style={{ paddingLeft: 10 }}>
            <Ionicons
              name="md-menu"
              color="grey"
              size={32}
              onPress={() => {
                AsyncStorage.getItem("email")
                  .then((value)=>{
                    this.setState({e:this.state.e=value})
                    console.log(this.state.e)
                }) 
                AsyncStorage.getItem("username")
                  .then((value)=>{
                    this.setState({name:this.state.name=value})
                    console.log(this.state.name)
                }) 
                AsyncStorage.getItem("photo")
                  .then((value)=>{
                    this.setState({u:this.state.u=value})
                    console.log(this.state.u)
                }) 
                this.props.navigation.toggleDrawer()}}
            />
          </View>
      }}>
       
      <Stack2.Screen
        name="Dashboard"
        component={Dashboard} 
        options={ ({
          title: 'Print It',
        })
        }
      />
      <Stack2.Screen
        name="Payment"
        component={Payment} 
        options={ ({
          title: 'Print It',
        })
        }
      /> 
      <Stack2.Screen
        name="Req"
        component={Req}
        options={ ({
          title: 'Print It',
        })
        }
      />
     <Stack2.Screen
        name="EstimatedReceipt"
        component={EstimatedReceipt}
        options={ ({
          title: 'Print It',
        })
        }
      />
      <Stack2.Screen 
        name="printshop"
        component={PrintShop}
        options={ ({
          title: 'Print It',
        })
        }
      /> 
      <Stack2.Screen 
        name="success"
        component={Successed}
        options={ ({
          title: 'Print It',
        })
        }
      />  
       </Stack2.Navigator>  
       
)}}
// Stack Navigation for favourite Country.
class StackNavigator3 extends React.Component { 
  render(){
    return (
      <Stack3.Navigator
      screenOptions={{
        headerTitleAlign:"center",
         headerTintColor:"grey",
         headerStyle:{
           backgroundColor:"orange",
           borderWidth:2,
          borderColor:"#fff",
         },
        headerLeft: () =>
          <View style={{ paddingLeft: 10 }}>
            <Ionicons
              name="md-menu"
              color="grey"
              size={32}
              onPress={() => this.props.navigation.toggleDrawer()}
            />
          </View>
      }}> 
      <Stack3.Screen 
      name="Your Prints" 
      component={YourPrints}
        options={{
        title: 'Print It',
        headerTitleAlign:"center",
         headerTintColor:"grey",
         headerStyle:{
           backgroundColor:"orange",
           borderWidth:2,
          borderColor:"#fff",
         },}}
      />
      <Stack3.Screen 
    name="history" 
    component={Historydetails}
        options={{
        title: 'Print It',
        headerTitleAlign:"center",
         headerTintColor:"grey", 
         headerStyle:{
           backgroundColor:"orange",
           borderWidth:2,
          borderColor:"#fff",
         },}}
      />
      
      
      </Stack3.Navigator>
    )}}
    

class StackNavigator4 extends React.Component { 
  render(){
    return (
      <Stack4.Navigator
      screenOptions={{
        headerTitleAlign:"center",
         headerTintColor:"grey",
         headerStyle:{
           backgroundColor:"orange",
           borderWidth:2,
          borderColor:"#fff",
         },
        headerLeft: () =>
          <View style={{ paddingLeft: 10 }}>
            <Ionicons
              name="md-menu"
              color="grey"
              size={32}
              onPress={() => this.props.navigation.toggleDrawer()}
            />
          </View>
      }}> 
      <Stack4.Screen name="Settings" component={Setting}
        options={{
        title: 'Print It',
        headerTitleAlign:"center",
         headerTintColor:"grey",
         headerStyle:{
           backgroundColor:"orange",
           borderWidth:2,
          borderColor:"#fff",
         },}}
      />
      </Stack4.Navigator>
    )}}

class StackNavigator5 extends React.Component { 
  render(){
    return (
      <Stack5.Navigator
      screenOptions={{
        headerTitleAlign:"center",
         headerTintColor:"grey",
         headerStyle:{
           backgroundColor:"orange",
           borderWidth:2,
          borderColor:"#fff",
         },
        headerLeft: () =>
          <View style={{ paddingLeft: 10 }}>
            <Ionicons
              name="md-menu"
              color="grey"
              size={32}
              onPress={() => this.props.navigation.toggleDrawer()}
            />
          </View>
      }}> 
      <Stack5.Screen name="Feedback" component={Feedback}
        options={{
        title: 'Print It',
        headerTitleAlign:"center",
         headerTintColor:"grey",
         headerStyle:{
           backgroundColor:"orange",
           borderWidth:2,
          borderColor:"#fff",
         },}}
      />
      </Stack5.Navigator>
    )}}
    class StackNavigator6 extends React.Component { 
  render(){
    return (
      <Stack6.Navigator
      screenOptions={{
        headerTitleAlign:"center",
         headerTintColor:"grey",
         headerStyle:{
           backgroundColor:"orange",
           borderWidth:2,
          borderColor:"#fff",
         },
        headerLeft: () =>
          <View style={{ paddingLeft: 10 }}>
            <Ionicons
              name="md-menu"
              color="grey"    
              size={32}
              onPress={() => this.props.navigation.toggleDrawer()}
            />
          </View>
      }}> 
      <Stack6.Screen name="Wallet" component={Wallet}
        options={{
        title: 'Wallet',
        headerTitleAlign:"center",
         headerTintColor:"grey", 
         headerStyle:{
           backgroundColor:"orange",
           borderWidth:2,
          borderColor:"#fff",
         },}}
      />
      </Stack6.Navigator>
    )}}

// main component for drawer call
export default class App extends React.Component {
  constructor(){
    super();
   this.state={
     trans:0,
   }
  }
   render(){
    return (
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    
  );
}}



