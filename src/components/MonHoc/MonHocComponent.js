import React, {Component} from 'react';
import {View, Text, Dimensions, Button, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {PieChart} from 'react-native-chart-kit';
import {userData, DataGetSubject} from '../../config/setting';
import HocKi1 from './HocKi1';
import HocKi2 from './HocKi2';
import HocKi3 from './HocKi3';
const Tab = createMaterialTopTabNavigator();
const data = [
  {
    name: 'Tín Chỉ Đã Học',
    population: 60,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: 'Tín Chỉ Cần Học',
    population: 40,
    color: '#F00',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
];

const screenWidth = Dimensions.get('window').width;
const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

export default class MonHocComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHaveData: true,
      NamHocData: [
        {
          IDNAM: 1,
          TENNAM: '2016-2017',
        },
        {
          IDNAM: 2,
          TENNAM: '2017-2018',
        },
        {
          IDNAM: 3,
          TENNAM: '2018-2019',
        },
        {
          IDNAM: 4,
          TENNAM: '2019-2020',
        },
      ],
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 60, width: '100%', flexDirection: 'row'}}>
          <View
            style={{
              height: 60,
              width: '100%',
              backgroundColor: '#ffffff',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#262626',
                fontSize: 20,
                marginLeft: 15,
                fontWeight: 'bold',
              }}>
              Môn học
            </Text>
            {/* <Button title="Check" onPress={() => console.log(userData)} /> */}
          </View>
        </View>
        {this.state.isHaveData == true ? (
          <Tab.Navigator
            // initialRouteName={
            //   this.props.isSave ? "DetailOrderScreen" : "CaptainOrderScreen"
            // }
            tabBarOptions={{
              activeTintColor: '#1890FF',
              inactiveTintColor: '#8C8C8C',
            }}>
            <Tab.Screen
              name="Hk1"
              component={HocKi1}
              options={{
                tabBarLabel: 'Học Kì 1',
              }}
            />
            <Tab.Screen
              name="Hk2"
              component={HocKi2}
              options={{tabBarLabel: 'Học Kì 2'}}
              initialParams={
                {
                  // detailsItem: this.state.detailsItem,
                }
              }
            />
            <Tab.Screen
              name="Hk3"
              component={HocKi3}
              options={{tabBarLabel: 'Học Kì 3'}}
              initialParams={
                {
                  // detailsItem: this.state.detailsItem,
                }
              }
            />
          </Tab.Navigator>
        ) : (
          <View>
            <Text style={{alignSelf: 'center'}}>
              Lựa chọn năm học bạn muốn xem
            </Text>
            {this.state.NamHocData.map((item) => {
              return (
                <TouchableOpacity
                  style={{
                    width: '85%',
                    height: 35,
                    backgroundColor: 'aqua',
                    alignSelf: 'center',
                    marginVertical: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 15,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.32,
                    shadowRadius: 5.46,

                    elevation: 9,
                  }}
                  onPress={() => {
                    DataGetSubject.idNam = item.IDNAM;
                    this.setState({isHaveData: false});
                  }}>
                  <Text>{item.TENNAM}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  }
}
