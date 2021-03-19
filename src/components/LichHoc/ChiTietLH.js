import React, {Component} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import Header from '../Custom/Header';
import {userData} from '../../config/setting';
import images from '../../res/img';
export default class ChiTietLH extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('param', this.props.route.params.item);
  }
  render() {
    const day =
      this.props.route.params.item.LICHOC.BUOIHOC1 ||
      this.props.route.params.item.LICHOC.BUOIHOC2 ||
      this.props.route.params.item.LICHOC.BUOIHOC3;
    const CAHOC =
      this.props.route.params.item.LICHOC.CAHOC1 ||
      this.props.route.params.item.LICHOC.CAHOC2 ||
      this.props.route.params.item.LICHOC.CAHOC3;
    return (
      <View style={{flex: 1}}>
        <Header
          title="Chi tiết môn học"
          onPressBackButton={() => this.props.navigation.goBack()}
        />
        <View style={{borderColor: 'red', padding: 20}}>
          <Text
            style={{
              color: '#FA541C',
              fontSize: 21,
              fontWeight: 'bold',
            }}>
            {day}
          </Text>
          <Text
            style={{
              paddingBottom: 30,
              fontSize: 16,
              color: '#8C8C8C',
              marginLeft: 2,
              padding: 5,
            }}>
            Ca học: {CAHOC}
          </Text>
          <View style={styles.card}>
            <Text style={{fontSize: 25, color: '#FA541C'}}>
              {this.props.route.params.item.TENMONHOC}
            </Text>
            <Text style={{fontSize: 21, padding: 5}}>
              <Image
                source={images.icon_profile}
                style={{
                  resizeMode: 'contain',
                  width: 30,
                  height: 27,
                  alignSelf: 'center',
                  marginBottom: 25,
                  tintColor: 'red',
                }}
              />
              {userData.FULLNAME}
            </Text>
            <Text style={{fontSize: 20, padding: 5}}>
              <Image
                source={images.ic_coso}
                style={{
                  resizeMode: 'contain',
                  width: 30,
                  height: 27,
                  alignSelf: 'center',
                  marginBottom: 25,
                  // tintColor: 'red',
                }}
              />
              Cơ sở: {this.props.route.params.item.TENCS}-
              {this.props.route.params.item.PHONGHOC}
            </Text>
            <Text
              style={{
                fontSize: 21,
                color: '#000',
                marginLeft: 2,
                padding: 5,
              }}>
              Tín chỉ:{' '}
              {
                <Text
                  style={{
                    fontSize: 21,
                    color: '#000',
                    marginLeft: 2,
                    padding: 5,
                  }}>
                  {this.props.route.params.item.TINCHI}
                </Text>
              }
            </Text>
            <Text style={{fontSize: 21, padding: 5}}>
              Giảng viên: Bùi Mạnh Toàn
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 10,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
