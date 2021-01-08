import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  ScrollView,

  TouchableOpacity,
} from 'react-native';
import { API_URL } from '../../config/setting';
import images from '../../res/img/index';
import ItemNews from './ItemNews';
export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemData: [],
    };
  }
  componentDidMount() {
    this.getApi();
  }
  getApi = () => {
    const res = fetch(`${API_URL}/News`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
      .then(responseJson => {
        this.setState({
          itemData: responseJson,
        })
        return responseJson;
      }).catch(error => {
        console.log(error)
      });
    return res;
  }
  
  showItem = (itemData) => {
    var result = null;
    if (itemData.length > 0) {
      result = itemData.map((item, index) => {
        return (
          <ItemNews
            key={index}
            TENEVNT={item.TENEVNT}
            THOIGIANEV={item.THOIGIANEV}
            MOTA={item.MOTA}
          />
        )
      })
    }
    return result;

  }
  render() {
    const { itemData } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ height: 210, width: '100%' }}>
          <View
            style={{
              height: 160,
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{ color: '#262626', fontSize: 20, marginLeft: 15, top: 5 }}>
              Trang chủ
            </Text>
            <TouchableOpacity>
              <Image
                source={images.ic_bell}
                resizeMode="center"
                style={{ width: 50, height: 30, top: 5 }}
              />
            </TouchableOpacity>
          </View>

          <Image
            style={{
              position: 'absolute',
              resizeMode: 'contain',
              width: '95%',
              height: 160,
              alignSelf: 'center',
              top: 48,
            }}
            source={require('../../res/img/img_home.png')}
          />
        </View>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',

            flexGrow: 1,
          }}
        >
          {this.showItem(itemData)}
        </ScrollView>

      </View >
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
