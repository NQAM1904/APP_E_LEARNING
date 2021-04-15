import React, { Component, createRef } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import images from '../../res/img/index';
import { API_URL, userData } from '../../config/setting';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { color } from '../../res/color';
import TextField from '../Custom/TextField';
import { connect } from 'react-redux';
import { showAlertAction } from '../../redux/action/showAlertAction';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupChangePassword: false,
      txtPasscode: '',
      txtNewPass: '',
      NewPassword: ''
    }
    this.txtPasscodeRef = React.createRef();
    this.txtNewPasscodeRef = React.createRef();
    this.txtPasscodeCheckRef = React.createRef();
  }
  onSubmit = () => {
    const { txtPasscode, txtNewPass, NewPassword } = this.state;

    if (txtPasscode == '') {
      this.txtPasscodeRef.current.error('Vui lòng không để trống');
    } else if (txtNewPass == '') {
      this.txtNewPasscodeRef.current.error('Vui lòng không để trống');
    } else if (NewPassword == '') {
      this.txtPasscodeCheckRef.current.error('Vui lòng không để trống');
    }
    else {
      this.setState({
        txtPasscode: '',
        txtNewPass: '',
        NewPassword: '',
        popupChangePassword: false
      });
      this.checkPassCode();

    }
  }
  checkPassCode = () => {
    const { txtPasscode, txtNewPass, NewPassword } = this.state;
    if (txtNewPass !== NewPassword) {
      this.props.showAlertAction('error', 'Mật khẩu xác nhận không chính xác!')
      return;
    } else {
      const { txtPasscode,
        txtNewPass,
        NewPassword } = this.state;
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        IDUSER: userData.IDUSER,
        OLDPASSWORD: txtPasscode,
        PASSWORD: NewPassword
      });
      console.log(raw)
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(API_URL + '/ChangePassword', requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.Success) {
            console.log(result)
            this.props.showAlertAction('success', result.Message);

          }
          else {
            this.props.showAlertAction('error', result.Message);
          }
        })
        .catch(error => console.log('error', error));
    }
  }
  render() {
    const { popupChangePassword } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View
          style={{
            height: 150,
            backgroundColor: '#E8E8E8',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <View
              style={{
                // padding: 20,
                flex: 1,
              }}>
              <Image
                source={images.ic_user}
                resizeMode={'contain'}
                style={{ width: 150, height: 150, borderRadius: 400 / 2 }}
              />
            </View>
            <Text
              style={{
                marginRight: 80,
                alignSelf: 'center',
                fontSize: 22,
              }}>
              {userData.FULLNAME}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.customMenu}
          onPress={() => this.props.navigation.navigate('CaNhan')}>
          <Icon name="user-alt" size={20} />
          <View style={styles.viewText}>
            <Text style={{ marginLeft: 15 }}>Thông tin cá nhân</Text>
          </View>
          <Icon name="chevron-right" size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.setState({ popupChangePassword: true })
          }}
          style={styles.customMenu}>
          <Icon name="lock" size={20} />
          <View style={styles.viewText}>
            <Text style={{ marginLeft: 15 }}>Đổi mật khẩu</Text>
          </View>
          <Icon name="chevron-right" size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.replace('Login')}
          style={styles.customMenu}>
          <Icon name="reply" size={20} />
          <View style={styles.viewText}>
            <Text style={{ marginLeft: 15 }}>Đăng xuất</Text>
          </View>
          <Icon name="chevron-right" size={20} />
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={popupChangePassword}>
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: '#00000036',
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>

                  <View style={{
                    backgroundColor: '#fff',
                    padding: 30
                  }}>
                    <Text
                      style={{ textAlign: 'center', fontSize: 24, marginBottom: 20 }}
                    >Thay đôi mật khẩu</Text>
                    <TextField
                      ref={this.txtPasscodeRef}
                      showEye={true}
                      label="Nhập mật khẩu cũ"
                      secureTextEntry
                      value={this.state.txtPasscode}
                      onChangeText={(text) => {
                        this.setState({
                          txtPasscode: text,
                        });
                      }}
                    />
                    <TextField
                      ref={this.txtNewPasscodeRef}

                      showEye={true}

                      label="Nhập mật khẩu mới "
                      secureTextEntry
                      value={this.state.txtNewPass}
                      onChangeText={(text) => {
                        this.setState({
                          txtNewPass: text,
                        });
                      }}
                    />
                    <TextField
                      ref={this.txtPasscodeCheckRef}

                      showEye={true}

                      label="Xác nhận mật khẩu"
                      secureTextEntry
                      value={this.state.NewPassword}
                      onChangeText={(text) => {
                        this.setState({
                          NewPassword: text,
                        });
                      }}
                    />
                    <TouchableOpacity
                      style={styles.btnDon}
                      onPress={() => this.onSubmit()}
                    >
                      <Text style={{ color: '#fff', fontSize: 22, textAlign: 'center' }}>Xác nhận</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  customMenu: {
    flexDirection: 'row',
    marginHorizontal: 20,
    height: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  viewText: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    width: '100%',
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    alignItems: 'center',
    marginLeft: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnDon: {
    backgroundColor: color.normal,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }

});

const mapDispatchToProps = (dispatch) => {
  return {
    showAlertAction: (form, message) =>
      dispatch(showAlertAction(form, message)),
  };
};
const mapStateToProps = (state) => {
  return {
    data: state.showAlertReducer,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
