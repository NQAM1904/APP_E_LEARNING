import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import images from '../../res/img/index';
export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{height: 210, width: '100%'}}>
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
              style={{color: '#262626', fontSize: 20, marginLeft: 15, top: 5}}>
              Trang chủ
            </Text>
            <TouchableOpacity>
              <Image
                source={images.ic_bell}
                resizeMode="center"
                style={{width: 50, height: 30, top: 5}}
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

        <View
          style={{
            marginTop: 5,
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
            }}>
            <Text style={{fontSize: 17}}>Sự kiện trong tuần</Text>
            <Text style={{fontSize: 17, color: 'red'}}>Xem tất cả</Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              height: 200,
              alignItems: 'center',
              flexGrow: 1,
            }}>
            <Image
              source={require('../../res/img/sukien_icon.png')}
              style={{resizeMode: 'contain', height: 200, width: 200}}
            />
            <Image
              source={require('../../res/img/sukien_icon.png')}
              style={{resizeMode: 'contain', height: 200, width: 200}}
            />
            <Image
              source={require('../../res/img/sukien_icon.png')}
              style={{resizeMode: 'contain', height: 200, width: 200}}
            />
          </ScrollView>
        </View>
        <View
          style={{
            marginTop: 5,
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
            }}>
            <Text style={{fontSize: 17}}>Sự kiện sắp diễn ra</Text>
            <Text style={{fontSize: 17, color: 'red'}}>Xem tất cả</Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              height: 200,
              alignItems: 'center',
              flexGrow: 1,
            }}>
            <Image
              source={require('../../res/img/sukien_icon.png')}
              style={{resizeMode: 'contain', height: 200, width: 200}}
            />
            <Image
              source={require('../../res/img/sukien_icon.png')}
              style={{resizeMode: 'contain', height: 200, width: 200}}
            />
            <Image
              source={require('../../res/img/sukien_icon.png')}
              style={{resizeMode: 'contain', height: 200, width: 200}}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
