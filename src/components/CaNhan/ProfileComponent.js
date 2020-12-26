import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import images from '../../res/img/index';
import {userData} from '../../config/setting';
import Icon from 'react-native-vector-icons/FontAwesome5';
class ProfileComponent extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
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
                padding: 20,

                flex: 1,
              }}>
              <Image
                source={images.Avatar}
                resizeMode={'contain'}
                style={{width: 100, height: 100, borderRadius: 400 / 2}}
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
            <Text style={{marginLeft: 15}}>Thông tin cá nhân</Text>
          </View>
          <Icon name="chevron-right" size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => alert('Updatting')}
          style={styles.customMenu}>
          <Icon name="lock" size={20} />
          <View style={styles.viewText}>
            <Text style={{marginLeft: 15}}>Đổi mật khẩu</Text>
          </View>
          <Icon name="chevron-right" size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.replace('Login')}
          style={styles.customMenu}>
          <Icon name="reply" size={20} />
          <View style={styles.viewText}>
            <Text style={{marginLeft: 15}}>Đăng xuất</Text>
          </View>
          <Icon name="chevron-right" size={20} />
        </TouchableOpacity>
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
});
export default ProfileComponent;
