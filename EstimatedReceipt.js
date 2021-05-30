import * as React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Picker,
  Checkbox,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
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
  CheckBox,
} from 'react-native-paper';
import { ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyCDMPn4E4K8tlQJ8Ij9bEK4hvsHBuzRY3M',
  authDomain: 'print-it-7f9da.firebaseapp.com',
  projectId: 'print-it-7f9da',
  storageBucket: 'print-it-7f9da.appspot.com',
  messagingSenderId: '752634262586',
  appId: '1:752634262586:web:122299f5b71c792dbe7103',
  measurementId: 'G-XWTSC8BVXV',
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = firebaseApp.firestore();
const auth = firebase.auth();

export default class EstimatedReceipt extends React.Component {
  constructor(props) {
    super();
    this.state = {
      turnnumber: String,
      estimatedtime: String,
      estimatedprice: String,
      name: String,
      pagenumber: 0,
      spagerange: '',
      epagerange: '',
      copies: 0,
      printtype: '',
      sname: String,
      price: 0,
      page: 0,
      dispatch: false,
      printcolor: '',
      cp: 10,
      p: 5,
      d: 10,
      title: '',
    };
  }
  getItems = async () => {
    await AsyncStorage.getItem('dispatched').then((value) => {
      this.setState({ d: (this.state.d = Number(value)) });
      console.log(this.state.d);
    });
    await AsyncStorage.getItem('priced').then((value) => {
      this.setState({ p: (this.state.p = Number(value)) });
      console.log(this.state.p);
    });
    console.log('getting');
    await AsyncStorage.getItem('coloredcost').then((value) => {
      this.setState({ cp: (this.state.cp = Number(value)) });
      console.log(this.state.cp);
    });
    await AsyncStorage.getItem('title').then((value) => {
      this.setState({ title: (this.state.title = value) });
      console.log(this.state.title);
    });
    await AsyncStorage.getItem('sname').then((value) => {
      this.setState({ sname: (this.state.sname = value) });
      console.log(this.state.sname);
    });
    console.log('getting');
    await AsyncStorage.getItem('printcolor').then((value) => {
      this.setState({ printcolor: (this.state.printcolor = String(value)) });
      console.log(this.state.printcolor);
    });
    await AsyncStorage.getItem('printtype').then((value) => {
      this.setState({ printtype: (this.state.printtype = String(value)) });
      console.log(this.state.printtype);
    });
    await AsyncStorage.getItem('pagenumber').then((value) => {
      this.setState({ pagenumber: (this.state.pagenumber = Number(value)) });
      console.log(this.state.pagenumber);
    });
    await AsyncStorage.getItem('copies').then((value) => {
      this.setState({ copies: (this.state.copies = Number(value)) });
      console.log(this.state.copies);
    });
    await AsyncStorage.getItem('epagerange').then((value) => { 
      this.setState({ epagerange: (this.state.epagerange = String(value)) });
      console.log(this.state.epagerange);
    });
    await AsyncStorage.getItem('spagerange').then((value) => {
      this.setState({ spagerange: (this.state.spagerange = String(value)) });
      console.log(this.state.spagerange);
    });
    await AsyncStorage.getItem('dispatch').then((value) => {
      this.setState({ dispatch: (this.state.dispatch = Boolean(value)) });
      console.log(this.state.dispatch);
    });
  };
  async componentDidMount() {
    await this.getItems();
    await this.bilCalculator();

    await db
      .collection('printshops')
      .get()
      .then((values) => {
        values.docs.forEach((d) => {
          if (d.data().name == this.state.sname) {
            this.setState({
              turnnumber: (this.state.turnnumber = d.data().tasks + 1),
            });
            console.log(this.state.page);
            this.setState({
              estimatedtime: (this.state.estimatedtime =
                this.state.page * this.state.copies * 1 + ' min'),
            });
            console.log(this.state.price);
            this.setState({
              estimatedprice: (this.state.estimatedprice =
                this.state.price + ' Rs'),
            });
            console.log(this.state.turnnumber);
          }
        });
      });
    AsyncStorage.setItem('printingcost', this.state.price).then(() => {
      console.log('printingcost was saved successfully', this.state.price);
    });
  }
  bilCalculator() {
    if (this.state.printcolor == 'colored') {
      console.log('COLORED');
      if (this.state.spagerange != '' && this.state.epagerange != '') {
        console.log('COLORED, PAGE RANGE IS GIVEN');
        if (this.state.printtype == 'print on both side') {
          console.log('COLORED, PRINT ON BOTH SIDES');
          const res = Math.ceil(
            (Number(this.state.epagerange) -
              Number(this.state.spagerange) +
              1) /
              2
          );
          this.setState({ page: (this.state.page = res) });
          if (this.state.dispatch) {
            console.log('COLORED, DISPATCH');
            this.setState({
              price: (this.state.price =
                this.state.page * this.state.cp * this.state.copies +
                this.state.d),
            });
          } else {
            console.log('COLORED, NOT DISPATCH');
            this.setState({
              price: (this.state.price =
                this.state.page * this.state.cp * this.state.copies),
            });
          }
        } else {
          console.log('COLORED, PRINT ONE SIDED');
          const res = Math.ceil(
            Number(this.state.epagerange) - Number(this.state.spagerange) + 1
          );
          this.setState({ page: (this.state.page = res) });
          if (this.state.dispatch) {
            this.setState({
              price: (this.state.price =
                this.state.page * this.state.cp * this.state.copies +
                this.state.d),
            });
          } else {
            this.setState({
              price: (this.state.price =
                this.state.page * this.state.cp * this.state.copies),
            });
          }
        }
      } else {
        console.log('COLORED, PAGE RANGE NOT GIVEN');
        if (this.state.printtype == 'print on both side') {
          console.log('COLORED, PAGE RANGE NOT GIVEN, PRINT ON BOTH SIDES');
          const res = Math.ceil(this.state.pagenumber / 2);
          this.setState({ page: (this.state.page = res) });
          if (this.state.dispatch) {
            this.setState({
              price: (this.state.price =
                this.state.page * this.state.cp * this.state.copies +
                this.state.d),
            });
            console.log(
              'COLORED, PAGE RANGE NOT GIVEN, PRINT ON BOTH SIDES,DISPATCH'
            );
          } else {
            console.log(
              'COLORED, PAGE RANGE NOT GIVEN,PRINT ON BOTH SIDES, NOT DISPATCH'
            );
            this.setState({
              price: (this.state.price =
                this.state.page * this.state.cp * this.state.copies),
            });
          }
        } else {
          console.log('COLORED, PAGE RANGE NOT GIVEN, PRINT ONE SIDE');
          const res = this.state.pagenumber;
          this.setState({ page: (this.state.page = res) });
          if (this.state.dispatch) {
            this.setState({
              price: (this.state.price =
                this.state.page * this.state.cp * this.state.copies +
                this.state.d),
            });
            console.log(
              'COLORED, PAGE RANGE NOT GIVEN, PRINT ONE SIDE, DISPATCH'
            );
          } else {
            this.setState({
              price: (this.state.price =
                this.state.page * this.state.cp * this.state.copies),
            });
          }
        }
      }
    } else {
      if (this.state.spagerange != '' && this.state.epagerange != '') {
        console.log('B&W, PAGE RANGE IS GIVEN');
        if (this.state.printtype == 'print on both side') {
          console.log('B&W, PRINT ON BOTH SIDES');
          const res = Math.ceil(
            (Number(this.state.epagerange) -
              Number(this.state.spagerange) +
              1) /
              2
          );
          this.setState({ page: (this.state.page = res) });
          if (this.state.dispatch) {
            console.log('B&W, DISPATCH');
            this.setState({
              price: (this.state.price =
                this.state.page * this.state.p * this.state.copies +
                this.state.d),
            });
          } else {
            console.log('B&W, NOT DISPATCH');
            this.setState({
              price: (this.state.price =
                this.state.page * this.state.p * this.state.copies),
            });
          }
        } else {
          console.log('B&W, PRINT ONE SIDED');
          const res = Math.ceil(
            Number(this.state.epagerange) - Number(this.state.spagerange) + 1
          );
          this.setState({ page: (this.state.page = res) });
          if (this.state.dispatch) {
            this.setState({
              price: (this.state.price =
                this.state.page * this.state.p * this.state.copies +
                this.state.d),
            });
          } else {
            this.setState({
              price: (this.state.price =
                this.state.page * this.state.p * this.state.copies),
            });
          }
        }
      } else {
        console.log('B&W, PAGE RANGE NOT GIVEN');
        if (this.state.printtype == 'print on both side') {
          console.log('B&W, PAGE RANGE NOT GIVEN, PRINT ON BOTH SIDES');
          const res = Math.ceil(this.state.pagenumber / 2);
          this.setState({ page: (this.state.page = res) });
          if (this.state.dispatch) {
            this.setState({
              price: (this.state.price =
                this.state.page * this.state.p * this.state.copies +
                this.state.d),
            });
            console.log(
              'B&W, PAGE RANGE NOT GIVEN, PRINT ON BOTH SIDES,DISPATCH'
            );
          } else {
            console.log(
              'B&W, PAGE RANGE NOT GIVEN,PRINT ON BOTH SIDES, NOT DISPATCH'
            );
            this.setState({
              price: (this.state.price =
                this.state.page * this.state.p * this.state.copies),
            });
          }
        } else {
          console.log('B&W, PAGE RANGE NOT GIVEN, PRINT ONE SIDE');
          const res = this.state.pagenumber;
          this.setState({ page: (this.state.page = res) });
          if (this.state.dispatch) {
            this.setState({
              price: (this.state.price =
                this.state.page * this.state.p * this.state.copies +
                this.state.d),
            });
            console.log('B&W, PAGE RANGE NOT GIVEN, PRINT ONE SIDE, DISPATCH');
          } else {
            this.setState({
              price: (this.state.price =
                this.state.page * this.state.p * this.state.copies),
            });
          }
        }
      }
    }
  }
  render() {
    this.props.navigation.setOptions({
      headerLeft: () => (
        <View style={{ paddingLeft: 10 }}>
          <Ionicons
            name="arrow-back"
            size={25}
            color="grey"
            onPress={() => {
              this.props.navigation.goBack(null);
            }}
          />
        </View>
      ),
    });
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <View style={{ marginTop: '2%' }}>
          <Text
            style={{
              fontFamily: 'Arial',
              fontSize: 22,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            {this.state.title}
          </Text>
        </View>
        <View style={{ alignSelf: 'center', marginTop: '2%' }}>
          <Avatar.Image
            source={{
              uri:
                'https://www.printerland.co.uk/blog/wp-content/uploads/2016/12/buying-new-printer-2-1024x682.jpg',
            }}
            size={100}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            padding: 5,
            backgroundColor: 'lightgrey',
            margin: 5,
            borderRadius: 10,
          }}>
          <Text
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              padding: 10,
              color: 'black',
            }}>
            Availablity Status{' '}
          </Text>
          <TouchableOpacity
            style={{ backgroundColor: 'green', borderRadius: 10 }}>
            <Text style={{ padding: 10, color: 'white' }}>Available</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            borderColor: 'orange',
            marginLeft: '20%',
            marginRight: '20%',
            padding: 5,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              marginTop: '2%',
              fontWeight: 'bold',
              fontSize: 19,
              color: 'orange',
            }}>
            Estimated Receipt
          </Text>
        </View>
        <ScrollView>
          <View
            style={{
              flex: 1,
              backgroundColor: 'lightgrey',
              padding: 15,
              borderRadius: 40,
              margin: 5,
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'orange',
                padding: 25,
                borderRadius: 40,
              }}>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <View style={{ flexDirection: 'row' }}>
                    <Text>Turn Number: {this.state.turnnumber}</Text>
                  </View>
                </ListItem.Content>
              </ListItem>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <View style={{ flexDirection: 'row' }}>
                    <Text>Estimated Time: {this.state.estimatedtime}</Text>
                  </View>
                </ListItem.Content>
              </ListItem>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <View style={{ flexDirection: 'row' }}>
                    <Text>Estimated Price: {this.state.estimatedprice} </Text>
                  </View>
                </ListItem.Content>
              </ListItem>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity
                style={{
                  padding: 5,
                  backgroundColor: 'orange',
                  color: 'white',
                  marginLeft: '20%',
                  marginRight: '3%',
                  marginTop: '3%',
                }}>
                <Text
                  style={{
                    padding: 5,
                    backgroundColor: 'orange',
                    color: 'white',
                    alignText: 'center',
                  }}
                  onPress={() => {
                    this.props.navigation.navigate('Payment');
                  }}>
                  Confirm
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 5,
                  backgroundColor: 'orange',
                  color: 'white',
                  marginRight: '20%',
                  marginLeft: '3%',
                  marginTop: '3%',
                }}>
                <Text
                  style={{
                    padding: 5,
                    backgroundColor: 'orange',
                    color: 'white',
                    alignText: 'center',
                  }}
                  onPress={() => {
                    this.setState({ price: (this.state.price = 0) });
                    this.setState({ page: (this.state.page = 0) });
                    this.props.navigation.navigate('Req');
                  }}>
                  Change Requirements
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
