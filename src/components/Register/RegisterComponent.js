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
  Images,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import TextInputAnimated from '../Custom/TextInputAnimated';
import images from '../../res/img/index';
import { API_URL } from '../../config/setting';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Spinner from 'react-native-loading-spinner-overlay';

export default class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      fullname: '',
      phone: '',
      address: '',
      idNienkhoa: '',
      email: '',
      idNganh: '',
      mssv: '',
      dataNienKhoa: [],
      nienKhoaChoose: null,
      dataNganh: [[]],
      nganhChoose: null,
      indexChoose: 0,
      isLoading: false,
    };
  }
  handleChangeNienKhoa = (item) => {
    this.setState({
      idNienkhoa: item.value,
      nganhChoose: { id: item.id, label: item.label, value: item.value },
    });
  };

  handleChangeNganh = (value) => {
    this.setState({ idNganh: value });
  };
  async componentDidMount() {
    await this.getNienkhoa();
  }

  getNienkhoa = async () => {
    let arrNK = [];
    let arrNganh = [];
    const result = await fetch(`${API_URL}/GetNK`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json()) // trả dữ liệu api về
      .then((result) => {
        return result;
      })
      .catch((error) => {
      });

    if (result != undefined) {
      let index = 0;
      result.Data.map((item) => {
        arrNK.push({
          id: index++,
          label: item.NAMENIENKHOA,
          value: item.IDNIENKHOA,
        });
        let idx = 0;
        let arrObjNganh = [];
        item.LISTNGANH.map((itemm) => {
          arrObjNganh.push({
            id: idx++,
            label: itemm.NAMENGANH,
            value: itemm.IDNGANH,
          });
        });

        arrNganh.push(arrObjNganh);
      });
      this.setState({ dataNienKhoa: arrNK, dataNganh: arrNganh, indexChoose: 0 });
      // console.log(arrNganh);
    } else {
      alert('Data lỗi');
    }
  };

  onSignUp = () => {
    this.setState({ isLoading: true });
    const {
      username,
      password,
      fullname,
      phone,
      address,
      idNienkhoa,
      idNganh,
      mssv,
      email,
      dataNienKhoa,
      dataNganh,
      isLoading,
    } = this.state;

    let data = {
      USERNAME: username,
      PASSWORD: password,
      FULLNAME: fullname,
      ADDRESS: address,
      PHONE: phone,
      MSSV: mssv,
      EMAIL: email,
      IDNIENKHOA: idNienkhoa,
      IDNGANH: idNganh,
    };

    if (
      username == '' ||
      password == '' ||
      fullname == '' ||
      address == '' ||
      phone == '' ||
      idNienkhoa == '' ||
      idNganh == ''
    ) {
      alert('Vui lòng điền đủ thông tin!');
      this.setState({ isLoading: false });
      return;
    }

    const result = fetch(`${API_URL}/SignUp`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        alert('Tạo tài khoản mới thành công!');
        this.setState({
          isLoading: false,
        });
        setTimeout(() => {
          this.props.navigation.replace('Login');
        }, 2000);
        return result;
      })
      .catch((error) => {
      });
    // console.log(result);
    return result;
  };

  render() {
    const {
      username,
      password,
      fullname,
      phone,
      idNienkhoa,
      idNganh,
      mssv,
      address,
      email,
      dataNienKhoa,
      dataNganh,
      isLoading,
    } = this.state;
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
          <View style={{ alignItems: 'center', marginBottom: 10 }}>
            <Image
              source={images.logo_dangky}
              resizeMode="center"
              style={{ width: 250, height: 170 }}
            />
          </View>

          <View style={{ width: '90%', alignSelf: 'center' }}>
            <View style={{ flexDirection: 'row', marginBottom: 12 }}>
              <View style={{ width: '65%' }}>
                <TextInputAnimated
                  style={{
                    marginRight: 10,
                    borderColor: '#8C8C8C',
                  }}
                  title="Tên"
                  textInputStyles={{ width: '100%' }}
                  value={fullname}
                  onChangeText={(text) => this.setState({ fullname: text })}
                />
              </View>
              <View style={{ width: '35%' }}>
                <TextInputAnimated
                  style={{
                    borderColor: '#8C8C8C',
                  }}
                  title="Nơi ở"
                  textInputStyles={{ width: '100%' }}
                  value={address}
                  onChangeText={(text) => this.setState({ address: text })}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 12 }}>
              <View style={{ width: '50%' }}>
                <TextInputAnimated
                  style={{
                    marginRight: 10,
                    borderColor: '#8C8C8C',
                  }}
                  title="Số điện thoại"
                  textInputStyles={{ width: '100%' }}
                  value={phone}
                  keyboardType="numeric"
                  onChangeText={(text) => this.setState({ phone: text })}
                />
              </View>
              <View style={{ width: '50%' }}>
                <TextInputAnimated
                  style={{
                    borderColor: '#8C8C8C',
                  }}
                  title="Mã số sinh viên"
                  textInputStyles={{ width: '100%' }}
                  value={mssv}
                  keyboardType="numeric"
                  onChangeText={(text) => this.setState({ mssv: text })}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 12 }}>
              <View style={{ width: '50%' }}>
                <DropDownPicker
                  placeholder="Niên khóa"
                  placeholderStyle={{ color: '#8C8C8C' }}
                  items={dataNienKhoa}
                  onChangeItem={(item) =>
                    this.setState({
                      idNienkhoa: item.value,
                      indexChoose: item.id,
                    })
                  }
                  labelStyle={styles.textDate}
                  containerStyle={{
                    height: 55,
                    marginRight: 10,
                  }}
                />
              </View>
              <View style={{ width: '50%' }}>
                <DropDownPicker
                  placeholder="Ngành"
                  labelStyle={styles.textDate}
                  placeholderStyle={{ color: '#8C8C8C' }}
                  items={dataNganh[this.state.indexChoose]}
                  onChangeItem={(item) =>
                    this.setState({
                      idNganh: item.value,
                    })
                  }
                  containerStyle={{
                    height: 55,
                  }}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 12 }}>
              <View style={{ width: '100%' }}>
                <TextInputAnimated
                  style={{
                    borderColor: '#8C8C8C',
                  }}
                  title="Email"
                  textInputStyles={{ width: '100%' }}
                  value={email}
                  onChangeText={(text) => this.setState({ email: text })}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 12 }}>
              <View style={{ width: '50%' }}>
                <TextInputAnimated
                  style={{
                    borderColor: '#8C8C8C',
                    marginRight: 10,
                  }}
                  title="Tài khoản"
                  textInputStyles={{ width: '100%' }}
                  value={username}
                  onChangeText={(text) => this.setState({ username: text })}
                />
              </View>
              <View style={{ width: '50%' }}>
                <TextInputAnimated
                  style={{
                    borderColor: '#8C8C8C',
                  }}
                  title="Mật khẩu"
                  textInputStyles={{ width: '100%' }}
                  value={password}
                  secureTextEntry
                  onChangeText={(text) => this.setState({ password: text })}
                />
              </View>
            </View>

            <View style={{ marginTop: 18 }}>
              <TouchableOpacity
                onPress={() => this.onSignUp()}
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
                  ĐĂNG KÝ
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
                onPress={() => this.props.navigation.replace('Login')}
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
                  ĐĂNG NHẬP
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
  textDate: {
    color: 'black',
    fontSize: 14,
  },
});
