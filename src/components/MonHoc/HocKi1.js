import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import {API_URL, userData, DataGetSubject} from '../../config/setting';
import {showAlertAction} from '../../redux/action/showAlertAction';
class HocKi1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      DataFull: new Array(),
      dataDiem: [],
      isShowSuaDiem: false,
      diem: '',
      item: {},
    };
  }
  componentDidMount() {
    // this.getData();
    this.props.navigation.addListener('focus', () => {
      this.getData();
      this.getDataDiem();
    });
  }
  getData = async () => {
    let data = {
      IDNGANH: userData.IDNGANH,
      IDNAM: DataGetSubject.idNam,
      IDHOCKY: 1,
    };
    const result = await fetch(`${API_URL}/GetMonHoc`, {
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

    if (result != undefined) {
      if (result.Success == true) {
        this.setState({DataFull: result.Data, isLoading: false});
      } else {
        alert('Dữ liệu nhận về thất bại');
      }
    }
  };
  getDataDiem = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      API_URL + '/Diem?IDSINHVIEN=' + `${userData.IDSTUDENT}`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({dataDiem: result.Data});
      })
      .catch((error) => console.log('error', error));
  };
  _listEmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <Text>Chưa có data</Text>
      </View>
    );
  };
  modalSuaDiem = () => (
    <Modal visible={this.state.isShowSuaDiem} animationType="fade" transparent>
      <TouchableWithoutFeedback
        onPress={() => this.setState({isShowSuaDiem: false})}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000030',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: '80%',
              paddingVertical: 16,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <Text>Nhập điểm</Text>
            <TextInput
              keyboardType="decimal-pad"
              style={{
                width: '70%',
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 8,
              }}
              value={this.state.diem}
              onChangeText={(txt) => this.setState({diem: txt})}
            />
            <TouchableOpacity
              onPress={() => {
                if (this.state.diem === '') {
                  // Alert.alert('Thông báo', 'Vui lòng nhập số điểm');
                  this.props.showAlertAction('warn', 'Vui lòng nhập số điểm');
                } else {
                  const item = this.state.item;
                  var myHeaders = new Headers();
                  myHeaders.append('Content-Type', 'application/json');
                  var input = {
                    IDSTUDENT: userData.IDSTUDENT,
                    DIEMTB: parseInt(this.state.diem),
                    STCDAT: 3,
                    TONGDIEM: parseInt(this.state.diem),
                    IDMONHOC: item.IDMONHOC,
                  };
                  var raw = JSON.stringify(input);

                  var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                  };

                  fetch(API_URL + '/InsertDiem', requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                      if (result.Success) {
                        this.props.showAlertAction('success', result.Message);
                        this.setState({diem: '', isShowSuaDiem: false}, () => {
                          this.getData();
                          this.getDataDiem();
                        });
                      } else {
                        this.setState({diem: '', isShowSuaDiem: false});
                        this.props.showAlertAction('error', result.Message);
                      }
                    })
                    .catch((error) => console.log('error', error));
                }
              }}
              style={{
                marginTop: 10,
                paddingVertical: 10,
                backgroundColor: 'cyan',
                borderRadius: 15,
                width: '70%',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'white',
                }}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
  renderItem = ({item, index}) => {
    const result = this.state.dataDiem.find(
      (e) => e.IDMONHOC === item.IDMONHOC,
    );
    return (
      <View
        style={{
          width: Dimensions.get('window').width / 2,

          padding: 10,
        }}>
        {this.modalSuaDiem()}
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 15,
            padding: 13,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.46,
            shadowRadius: 11.14,

            elevation: 17,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: '#EFEFEF',
            }}>
            <Text style={{width: '80%'}} numberOfLines={1}>
              {item.TENMONHOC}
            </Text>
            <Image
              style={{
                resizeMode: 'contain',
                height: 21,
                width: 21, //0 xam , 0<x<4 do, xanh
                tintColor: !result?.DIEMTB
                  ? 'gray'
                  : result?.DIEMTB == 0
                  ? 'gray'
                  : result?.DIEMTB < 4
                  ? 'red'
                  : 'green',
              }}
              source={require('../../res/img/heart_check.png')}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>ENCC 101</Text>
            <View style={{alignItems: 'flex-end'}}>
              <Text>{item.TINCHI + '/' + result ? result?.STCDAT : 0}</Text>
              {result?.DIEMTB ? (
                <Text>{result.DIEMTB}.0</Text>
              ) : (
                <TouchableOpacity
                  style={{marginTop: 10}}
                  onPress={() =>
                    this.setState({isShowSuaDiem: true, item: item})
                  }>
                  <Text style={{color: '#1890FF', fontSize: 16}}>Sửa điểm</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };
  render() {
    const {isLoading} = this.state;
    const loading =
      isLoading === true ? (
        <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          animation="fade"
        />
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            ListEmptyComponent={this._listEmptyComponent}
            data={this.state.DataFull}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index}
            numColumns={2}
          />
        </View>
      );
    return <View style={styles.container}>{loading}</View>;
  }
}

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
export default connect(mapStateToProps, mapDispatchToProps)(HocKi1);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
