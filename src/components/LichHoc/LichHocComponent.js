import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import moment from "moment";
import { API_URL, userData, DataGetSubject } from '../../config/setting';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

import images from '../../res/img';
import ItemLH from './ItemLH';

export default class LichHocComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DataTick: {},
      DataTickArr: [],
      DataShow: [],
      selectItem: [],
      message: ''
    };
  }
  getMonHoc = (day) => {
    const result = fetch(`${API_URL}/GetMonHocByDay?IDSINHVIEN=${userData.IDSTUDENT}&Day=${day}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          selectItem: result.Data,
          message: result.Message
        })
        return result;
      })
      .catch((error) => {
        alert('Vui lòng kiểm tra internet!');
      });
    return result;
  }

  async componentDidMount() {
    this.props.navigation.addListener('focus', async () => {
      // The screen is focused
      // Call any action
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
        });

      if (result != undefined) {
        if (result.Success == true) {
          let ArrDataMark = []
          result.Data.map((item) => {
            var DataStart = new Date();
            var DataEnd = new Date();
            let dateNeed = [];
            dateNeed.push(this.checkDate(item.LICHOC.BUOIHOC1));
            dateNeed.push(this.checkDate(item.LICHOC.BUOIHOC2));
            dateNeed.push(this.checkDate(item.LICHOC.BUOIHOC3));


            DataStart.setFullYear(parseInt(item.THOIGIANBATDAU.substring(0, 4)), parseInt(item.THOIGIANBATDAU.substring(5, 7)) - 1, parseInt(item.THOIGIANBATDAU.substring(8, 10)));
            DataEnd.setFullYear(parseInt(item.THOIGIANKETTHUC.substring(0, 4)), parseInt(item.THOIGIANKETTHUC.substring(5, 7)) - 1, parseInt(item.THOIGIANKETTHUC.substring(8, 10)));

            // let TempStart = DataStart.setFullYear(item.THOIGIANBATDAU.substring(0, 4), item.THOIGIANBATDAU.substring(5, 7), item.THOIGIANBATDAU.substring(8, 10));
            // let TempEnd = DataEnd.setFullYear(item.THOIGIANKETTHUC.substring(0, 4), item.THOIGIANKETTHUC.substring(5, 7), item.THOIGIANKETTHUC.substring(8, 10));
            // console.log(DataStart, DataEnd)
            // console.log(DataStart.getDay(), "NCQ")

            // DataStart.setDate(DataStart.getDate() + 1);

            // console.log(DataStart.getDay(), "NCQ")


            while (DataStart <= DataEnd) {
              if (DataStart.getDay() == dateNeed[0] || DataStart.getDay() == dateNeed[1] || DataStart.getDay() == dateNeed[2]) {
                var tmp = moment(DataStart).format('YYYY-MM-DD').toString();

                ArrDataMark.push({
                  date: tmp, value: {
                    periods: [
                      { startingDay: false, endingDay: true, color: '#5f9ea0' },
                    ],
                    DataVal: {
                      BuoiHoc1: item.LICHOC.BUOIHOC1,
                      BuoiHoc2: item.LICHOC.BUOIHOC2,
                      BuoiHoc3: item.LICHOC.BUOIHOC3,
                      CaHoc1: item.LICHOC.CAHOC1,
                      CaHoc2: item.LICHOC.CAHOC2,
                      CaHoc3: item.LICHOC.CAHOC3,
                    }
                  }
                })
                DataStart.setDate(DataStart.getDate() + 1);
              }
              else {
                DataStart.setDate(DataStart.getDate() + 1);
              }
            }


          })
          // console.log(this.toObject(ArrDataMark))
          this.setState({ DataTickArr: ArrDataMark, DataTick: this.toObject(ArrDataMark) })
        } else {
          // console.log(result)
          alert('Dữ liệu nhận về thất bại');
        }
      }


      LocaleConfig.locales["en"] = {
        monthNames: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],
        monthNamesShort: [
          "Th 1.",
          "Th 2.",
          "Th 3",
          "Th 4",
          "Th 5",
          "Th 6",
          "Th 7.",
          "Th 8",
          "Th 9.",
          "Th 10.",
          "Th 11.",
          "Th 12.",
        ],
        dayNames: [
          "Chủ Nhật",
          "Thứ 2",
          "Thứ 3",
          "Thứ 4",
          "Thứ 5",
          "Thứ 6",
          "Thứ 7",
        ],
        dayNamesShort: ["CN.", "T2.", "T3.", "T4.", "T5.", "T6.", "T7."],
        // today: Date.now(),
      };
      LocaleConfig.defaultLocale = "en";
    });




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
      if (arr[i] !== undefined) rv[arr[i].date] = arr[i].value;
    return rv;
  }
  GetDayLichHoc = (date) => {
    let tmp = this.state.DataTickArr;

    // this.setState({ DataShow: tmp.filter(x => x.date.toString() == date) }, () => console.log(this.state.DataShow))
  }

  showMon = (selectItem) => {

    var result = null;
    if (selectItem !== null) {
      if (selectItem.length > 0) {
        result = selectItem.map((item, index) => {
          return (
            <ItemLH
              key={index}
              TENMONHOC={item.TENMONHOC}
              TENCS={item.TENCS}
              PHONGHOC={item.PHONGHOC}
            />
          );
        })
      }
    } else {
      result = <Text>{this.state.message}</Text>;
    }

    return result;
  }
  render() {
    const { selectItem, DataShow, DataTickArr } = this.state;
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
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('DangKyMH') }}>
              <Image source={images.plus} style={{ width: 50, height: 50, tintColor: '#000' }} resizeMode={'contain'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ padding: 20 }}>
          <Calendar
            onDayPress={(day) => this.getMonHoc(day.dateString)}
            markedDates={
              this.state.DataTick
            }
            // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
            markingType="multi-period"
          />
        </View>
        {/* this.GetDayLichHoc(day.dateString) */}
        <View style={{ flex: 1, padding: 10 }}>
          <Text style={{ color: '#161616', padding: 5, fontSize: 20 }}>
            Hôm nay
          </Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}>
            {this.showMon(selectItem)}
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
