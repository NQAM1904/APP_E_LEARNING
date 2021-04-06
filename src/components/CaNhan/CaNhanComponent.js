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
  Button,
} from 'react-native';
import TextInputAnimated from '../Custom/TextInputAnimated';
import images from '../../res/img/index';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { userData, API_URL } from '../../config/setting';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default class CaNhanComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valUserName: userData.USERNAME,
      fullName: userData.FULLNAME,
      phone: userData.PHONE,
      Nienkhoa: userData.IDNIENKHOA,
      Nganh: userData.IDNGANH,
      Mssv: '1212',
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    const result = await fetch(
      `${API_URL}/GetProfile?nKhoa=${userData.IDNIENKHOA}&idNganh=${userData.IDNGANH}&idSTD=${userData.IDSTUDENT}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((result) => {
        return result;
      })
      .catch((error) => {
        alert('Vui lòng kiểm tra internet!');
      });
    if (result != undefined) {
      if (result.Success == true) {
        // console.log(result);
        this.setState({
          Nienkhoa: result.Data.NIENKHOANAME,
          Mssv: result.Data.MSSV,
          Nganh: result.Data.NGANHNAME,
        });
      } else {
        alert('Dữ liệu nhận về thất bại');
      }
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 60, width: '100%' }}>
          <View
            style={{
              height: 60,
              width: '100%',
              backgroundColor: '#ffffff',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="angle-left" size={20} style={{ padding: 14 }} />
            </TouchableOpacity>
            <Text
              style={{
                color: '#262626',
                fontSize: 20,
                marginLeft: 15,
                fontWeight: 'bold',
              }}>
              Thông tin cá nhân
            </Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <View style={{ flexDirection: 'row', marginBottom: 12 }}>
              <View style={{ width: '100%' }}>
                <TextInputAnimated
                  style={{
                    marginRight: 10,
                    borderColor: '#8C8C8C',
                  }}
                  title="Tên"
                  textInputStyles={{ width: '100%' }}
                  value={this.state.fullName}
                  onChangeText={(text) => this.setState({ fullName: text })}
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
                  value={this.state.phone}
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
                  value={this.state.Mssv}
                  keyboardType="numeric"
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
                  title="Niên khoá"
                  textInputStyles={{ width: '100%' }}
                  value={this.state.Nienkhoa}
                  onChangeText={(text) => this.setState({ Nienkhoa: text })}
                />
              </View>
              <View style={{ width: '50%' }}>
                <TextInputAnimated
                  style={{
                    borderColor: '#8C8C8C',
                  }}
                  title="Ngành"
                  textInputStyles={{ width: '100%' }}
                  value={this.state.Nganh}
                  onChangeText={(text) => this.setState({ Nganh: text })}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 12 }}>
              <View style={{ width: '100%' }}>
                <TextInputAnimated
                  style={{
                    borderColor: '#8C8C8C',
                  }}
                  title="Tài khoản"
                  textInputStyles={{ width: '100%' }}
                  value={this.state.valUserName}
                  onChangeText={(text) => this.setState({ valUserName: text })}
                />
              </View>
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
  },
});
