import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import images from '../../res/img/index';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Spinner from 'react-native-loading-spinner-overlay';
import { userData, API_URL } from '../../config/setting';
export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'sinhvien',
      password: '123',
      icon: true,
      isLoading: false,
      nameIcon: 'icon_eye_no',
    };
  }

  onHandleChange = () => {
    this.setState({
      icon: !this.state.icon,
      nameIcon: !this.state.nameIcon ? 'icon_eye_no' : 'icon_eye',
    });
  };

  componentDidMount = () => { };

  onLogin = async () => {
    this.setState({ isLoading: true });
    const { username, password } = this.state;
    if (username == '' || password == '') {
      this.setState({ isLoading: false });
      return;
    }
    let data = {
      USERNAME: username,
      PASSWORD: password,
    };
    const result = await fetch(`${API_URL}/Login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        return result;
      })
      .catch((error) => {
        alert('Vui lòng kiểm tra internet!');
      });

    if (result !== undefined) {
      if (result.Success === true) {
        userData.USERNAME = result.Data.USERNAME;
        userData.PHONE = result.Data.PHONE;
        userData.IDROLE = result.Data.IDROLE;
        userData.EMAIL = result.Data.EMAIL;
        userData.IDSTUDENT = result.Data.IDSTUDENT;
        userData.MSSV = result.Data.MSSV;
        userData.IDNGANH = result.Data.IDNGANH;
        userData.IDNIENKHOA = result.Data.IDNIENKHOA;
        userData.FULLNAME = result.Data.FULLNAME;
        userData.ADDRESS = result.Data.ADDRESS;
        userData.TOKEN = result.Data.TOKEN;

        setTimeout(() => {
          this.setState({ isLoading: false });
          this.props.navigation.navigate('Tab');
        }, 1000);
      } else {
        this.setState({ isLoading: false });
        alert(result.Message);
      }
    }
  };

  render() {
    const { username, password, icon, nameIcon, isLoading } = this.state;
    const loading = isLoading === true && (
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
        animation="fade"
      />
    );
    return (
      <View style={styles.container}>
        {loading}
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            flexGrow: 1,
            justifyContent: 'center',
          }}>
          <Image
            style={{
              resizeMode: 'contain',
              width: '50%',
              height: 270,
              alignSelf: 'center',
              marginBottom: 25,
            }}
            source={require('../../res/img/logo_login.png')}
          />
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <View
              style={{
                flexDirection: 'row',
                borderTopColor: '#8C8C8C',
                borderBottomWidth: 1,
                marginBottom: 7,
              }}>
              <Image
                style={{
                  resizeMode: 'contain',
                  width: '6%',
                  flex: 0.1,
                  height: (windowWidth / 100) * 6,
                  alignSelf: 'center',
                }}
                source={require('../../res/img/icon_profile.png')}
              />
              <TextInput
                placeholder="Tài khoản"
                value={username}
                onChangeText={(username) => this.setState({ username: username })}
                style={{ flex: 0.8, fontSize: 18 }}
              />
              <View style={{ flex: 0.1 }} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderTopColor: '#8C8C8C',
                borderBottomWidth: 1,
                marginBottom: 7,
              }}>
              <Image
                style={{
                  resizeMode: 'contain',
                  width: '6%',
                  flex: 0.1,
                  height: (windowWidth / 100) * 6,
                  alignSelf: 'center',
                }}
                source={require('../../res/img/icon_password.png')}
              />
              <TextInput
                placeholder="Mật khẩu"
                secureTextEntry={icon}
                value={password}
                onChangeText={(password) => this.setState({ password: password })}
                style={{ flex: 0.8, fontSize: 18 }}
              />
              <Image
                style={{
                  resizeMode: 'contain',
                  width: '6%',
                  flex: 0.1,
                  height: (windowWidth / 100) * 6,
                  alignSelf: 'center',
                }}
                source={icon ? images.icon_eye : images.icon_eye_no}
                onPress={this.onHandleChange}
              />
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text
                style={{ color: '#1890FF', fontSize: 17, fontWeight: 'bold' }}>
                Quên mật khẩu
              </Text>
            </View>
            <View style={{ marginTop: 18 }}>
              <TouchableOpacity
                onPress={() => this.onLogin()}
                style={{
                  backgroundColor: '#1890FF',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 15,
                  borderRadius: 15,
                }}>
                <Text
                  style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
                  ĐĂNG NHẬP
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    borderTopColor: '#8C8C8C',
                    borderBottomWidth: 0.5,
                    width: '40%',
                    height: 0,
                  }}
                />
                <Text style={{ color: '#8C8C8C' }}>Hoặc</Text>
                <View
                  style={{
                    borderTopColor: '#8C8C8C',
                    borderBottomWidth: 0.5,
                    width: '40%',
                    height: 0,
                  }}
                />
              </View>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Register')}
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: '#1890FF',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 15,
                  borderRadius: 15,
                }}>
                <Text
                  style={{ color: '#1890FF', fontWeight: 'bold', fontSize: 18 }}>
                  ĐĂNG KÝ
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
