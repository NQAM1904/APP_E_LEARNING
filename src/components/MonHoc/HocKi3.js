import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import {API_URL, userData, DataGetSubject} from '../../config/setting';
export default class HocKi3 extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true, DataFull: new Array()};
  }
  componentDidMount() {
    // this.getData();
    this.getData();
  }
  getData = async () => {
    let data = {
      IDNGANH: userData.IDNGANH,
      IDNAM: DataGetSubject.idNam,
      IDHOCKY: 3,
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
        console.log(result.Data);
        this.setState({DataFull: result.Data, isLoading: false});
      } else {
        alert('Dữ liệu nhận về thất bại');
      }
    }
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
  renderItem = ({item}) => (
    <View
      style={{
        width: Dimensions.get('window').width / 2,

        padding: 10,
      }}>
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
            style={{resizeMode: 'contain', height: 21, width: 21}}
            source={require('../../res/img/heart_check.png')}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>ENCC 101</Text>
          <View style={{alignItems: 'flex-end'}}>
            <Text>{item.TINCHI}(3.0)</Text>
            <TouchableOpacity style={{marginTop: 10}}>
              <Text style={{color: '#1890FF', fontSize: 16}}>Sửa điểm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
