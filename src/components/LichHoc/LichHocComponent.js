import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import moment from "moment";
import { API_URL, userData, DataGetSubject } from '../../config/setting';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import images from '../../res/img';

export default class LichHocComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { DataTick: {} };
  }
  async componentDidMount() {
    const result = await fetch(`${API_URL}/GetTKB?IDSINHVIEN=${userData.IDSTUDENT}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

    })
      .then((response) => response.json())
      .then((result) => {
        return result;
      })
      .catch((error) => {
        alert('Vui lòng kiểm tra internet!');
        console.log(error)
      });

    if (result != undefined) {
      if (result.Success == true) {
        console.log(result.Data);
        let ArrDataMark = []
        result.Data.map((item) => {
          var DataStart = new Date();
          var DataEnd = new Date();
          let dateNeed = [];
          dateNeed.push(this.checkDate(item.LICHOC.BUOIHOC1));
          dateNeed.push(this.checkDate(item.LICHOC.BUOIHOC2));
          dateNeed.push(this.checkDate(item.LICHOC.BUOIHOC3));
          DataStart.setFullYear(item.THOIGIANBATDAU.substring(0, 4), item.THOIGIANBATDAU.substring(5, 7), item.THOIGIANBATDAU.substring(8, 10));
          DataEnd.setFullYear(item.THOIGIANKETTHUC.substring(0, 4), item.THOIGIANKETTHUC.substring(5, 7), item.THOIGIANKETTHUC.substring(8, 10));

          let TempStart = DataStart.setFullYear(item.THOIGIANBATDAU.substring(0, 4), item.THOIGIANBATDAU.substring(5, 7), item.THOIGIANBATDAU.substring(8, 10));
          let TempEnd = DataEnd.setFullYear(item.THOIGIANKETTHUC.substring(0, 4), item.THOIGIANKETTHUC.substring(5, 7), item.THOIGIANKETTHUC.substring(8, 10));



          while (TempStart <= TempEnd) {
            if (new Date(TempStart).getDay() == dateNeed[0] || new Date(TempStart).getDay() == dateNeed[1] || new Date(TempStart).getDay() == dateNeed[2]) {
              var tmp = moment(new Date(TempStart).getDate()).format('YYYY-MM-DD').toString();

              ArrDataMark.push({
                date: tmp, value: {
                  periods: [
                    { startingDay: false, endingDay: true, color: '#5f9ea0' },
                  ],
                }
              })
              TempStart++;
            }
            else {
              TempStart++;
            }
          }


        })
        console.log(ArrDataMark)
      } else {
        console.log(result)
        alert('Dữ liệu nhận về thất bại');
      }
    }

    LocaleConfig.locales['fr'] = {
      monthNames: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre',
      ],
      monthNamesShort: [
        'Janv.',
        'Févr.',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juil.',
        'Août',
        'Sept.',
        'Oct.',
        'Nov.',
        'Déc.',
      ],
      dayNames: [
        'Dimanche',
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
        'Samedi',
      ],
      dayNamesShort: ['T2.', 'T3.', 'T4.', 'T5.', 'T6.', 'T7.', 'CN.'],
      today: 'Mardi',
    };
    LocaleConfig.defaultLocale = 'fr';
  }
  checkDate = (val) => {
    switch (val) {
      case "Thứ 2":
        return 1;
      case "Thứ 3":
        return 2;
      case "Thứ 4":
        return 3;
      case "Thứ 5":
        return 4;
      case "Thứ 6":
        return 5;
      case "Thứ 7":
        return 6;
      case "Chủ Nhật":
        return 0;
      default:
        return 10;
    }
  }
  toObject = (arr) => {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      if (arr[i] !== undefined) rv[i] = arr[i];
    return rv;
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#820014"
        />
        <View style={{ height: 60, width: '100%' }}>
          <View
            style={{
              height: 60,
              width: '100%',
              backgroundColor: '#ffffff',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ color: '#262626', fontSize: 20, marginLeft: 15 }}>
              Lịch học
            </Text>
          </View>
        </View>
        <View style={{ padding: 20 }}>
          <Calendar
            onDayPress={(day) => console.log(day)}
            markedDates={
              this.state.DataTick
            }
            // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
            markingType="multi-period"
          />
        </View>
        <View style={{ flex: 1, padding: 10 }}>
          <Text style={{ color: '#161616', padding: 5, fontSize: 20 }}>
            Hôm nay
          </Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}>
            <View
              style={{
                borderRadius: 0,
                padding: 10,
                backgroundColor: '#ffffff',
              }}>
              <Text>Ca 2</Text>
              <View style={{ flexDirection: 'row', padding: 5 }}>
                <Image
                  source={images.ic_monhoc}
                  style={{ width: 25, height: 30, marginRight: 10 }}
                  resizeMode="center"
                />
                <Text style={{ alignItems: 'center' }}>
                  Môn học: Trí tuệ nhân tạo
                </Text>
              </View>
              <View style={{ flexDirection: 'row', padding: 5 }}>
                <Image
                  source={images.ic_coso}
                  style={{ width: 25, height: 30, marginRight: 10 }}
                  resizeMode="center"
                />
                <Text style={{ alignItems: 'center' }}>Cở sở: E1- phòng 2</Text>
              </View>
            </View>

            <View
              style={{
                borderRadius: 0,
                padding: 10,
                marginTop: 10,
                backgroundColor: '#ffffff',
              }}>
              <Text>Ca 2</Text>
              <View style={{ flexDirection: 'row', padding: 5 }}>
                <Image
                  source={images.ic_monhoc}
                  style={{ width: 25, height: 30, marginRight: 10 }}
                  resizeMode="center"
                />
                <Text style={{ alignItems: 'center' }}>
                  Môn học: Trí tuệ nhân tạo
                </Text>
              </View>
              <View style={{ flexDirection: 'row', padding: 5 }}>
                <Image
                  source={images.ic_coso}
                  style={{ width: 25, height: 30, marginRight: 10 }}
                  resizeMode="center"
                />
                <Text style={{ alignItems: 'center' }}>Cở sở: E1- phòng 2</Text>
              </View>
            </View>

            <View
              style={{
                borderRadius: 0,
                padding: 10,
                marginTop: 10,
                backgroundColor: '#ffffff',
              }}>
              <Text>Ca 2</Text>
              <View style={{ flexDirection: 'row', padding: 5 }}>
                <Image
                  source={images.ic_monhoc}
                  style={{ width: 25, height: 30, marginRight: 10 }}
                  resizeMode="center"
                />
                <Text style={{ alignItems: 'center' }}>
                  Môn học: Trí tuệ nhân tạo
                </Text>
              </View>
              <View style={{ flexDirection: 'row', padding: 5 }}>
                <Image
                  source={images.ic_coso}
                  style={{ width: 25, height: 30, marginRight: 10 }}
                  resizeMode="center"
                />
                <Text style={{ alignItems: 'center' }}>Cở sở: E1- phòng 2</Text>
              </View>
            </View>
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
