import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import BottomSheet from '../Custom/BottomSheet';
import Header from '../Custom/Header';
import { API_URL, userData } from '../../config/setting';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-datepicker';

class DangKyMH extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            itemMH: '',
            itemNGAY: '',
            itemCA: '',
            startDate: '',
            endDate: '',
        }
    }
    componentDidMount() {
        this.getMonHoc();
    }
    postTKB = () => {
        const url = API_URL + `/InsertTKBSV`
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(
            {
                IDSTUDENT: userData.IDSTUDENT,
                IDMONHOC: this.state.itemMH.IDMONHOC,
                IDCOSO: 1,
                IDTIETHOC: 3,
                TIMESTART: this.state.startDate.split('-').reverse().join('-'),
                TIMEEND: this.state.endDate.split('-').reverse().join('-'),
                LICHHOC: {
                    BUOIHOC1: this.state.itemNGAY.id,
                    CAHOC1: this.state.itemCA.id,
                    BUOIHOC2: null,
                    CAHOC2: null,
                    BUOIHOC3: null,
                    CAHOC3: null
                }
            });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                alert(result.Message)
                if (result.Success) {
                    this.props.navigation.goBack()
                }
            })
            .catch(error => alert(error));
    }
    getMonHoc = () => {
        const url = API_URL + `/GetMonHocAllowDK?IDSINHVIEN=${userData.IDSTUDENT}`
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    data: result.Data
                })
            })
            .catch(error => console.log('error', error));
    }
    ItemRender = (title, onPress, state, item) => {
        return (
            <TouchableOpacity
                style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' }}
                onPress={onPress}>
                <Text style={{ fontSize: 20 }}>
                    {title}
                </Text>
                {state === item && <Icon name="check-circle" solid color='blue' size={20} />}
            </TouchableOpacity>
        )
    }
    renderMH = ({ item, index }) => (
        <>
            {this.ItemRender(item.TENMONHOC, () => this.setState({ itemMH: item }), this.state.itemMH, item)}
        </>
    )
    renderNGAY = ({ item, index }) => (
        <>
            {this.ItemRender(item.title, () => this.setState({ itemNGAY: item }), this.state.itemNGAY, item)}
        </>
    )
    renderCA = ({ item, index }) => (
        <>
            {this.ItemRender(item.title, () => this.setState({ itemCA: item }), this.state.itemCA, item)}
        </>
    )
    handleChangestartedDate = (startedDate) => {
        this.setState({ startDate: startedDate });
    };
    handleChangeEndedDate = (endedDate) => {
        this.setState({ endDate: endedDate });

    }
    render() {

        return (
            <View style={{ flex: 1, backgroundColor: 'white', }}>
                <Header
                    title="Đăng ký môn học"
                    onPressBackButton={() => this.props.navigation.goBack()}
                />
                <Text style={{ margin: 10 }}>Môn học</Text>
                <BottomSheet
                    placeholder="Chọn Môn Học"
                    data={this.state.data}
                    renderItem={this.renderMH}
                    value={this.state.itemMH.TENMONHOC}
                />
                <BottomSheet
                    placeholder="Chọn Ngày Học"
                    data={DAY}
                    renderItem={this.renderNGAY}
                    value={this.state.itemNGAY.title}
                />
                <BottomSheet
                    placeholder="Chọn Ca Học"
                    data={CA}
                    renderItem={this.renderCA}
                    value={this.state.itemCA.title}
                />
                <DatePicker
                    style={{ marginHorizontal: 16, width: '95%', marginTop: 16 }}
                    date={this.state.startDate}
                    mode="date"
                    format="DD-MM-YYYY"
                    placeholder="Chọn ngày bắt đầu"
                    minDate={new Date()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateInput: {
                            borderRadius: 10,

                        },
                        dateIcon: {
                            width: 0, height: 0
                        }
                    }}
                    onDateChange={(date) => {
                        this.handleChangestartedDate(date);
                    }}
                />
                <DatePicker
                    style={{ marginHorizontal: 16, width: '95%', marginTop: 16 }}
                    date={this.state.endDate}
                    mode="date"
                    format="DD-MM-YYYY"
                    placeholder="Chọn ngày bắt đầu"
                    minDate={new Date()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateInput: {
                            borderRadius: 10,

                        },
                        dateIcon: {
                            width: 0, height: 0
                        }
                    }}
                    onDateChange={(date) => {
                        this.handleChangeEndedDate(date);
                    }}
                />
                <TouchableOpacity
                    onPress={this.postTKB}


                    style={{ position: 'absolute', bottom: 10, width: '90%', height: 56, justifyContent: 'center', alignItems: 'center', backgroundColor: 'cyan', borderRadius: 20, alignSelf: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Lưu</Text>
                </TouchableOpacity>
            </View>
        );

    }
}
export default DangKyMH;
const CA = [
    { id: 1, title: `Ca 1 (tiết 1,2,3): từ 06g45' đến 09g00'` },
    { id: 2, title: `Ca 2 (tiết 4,5,6): từ 09g20' đến 11g35'` },
    { id: 3, title: `Ca 3 (tiết 7,8,9): từ 12g30' đến 14g45'` },
    { id: 4, title: `Ca 4 (tiết 10,11,12): từ 15g05' đến 17g20'` },
    { id: 5, title: `Ca 5 (tiết 13,14,15): từ 18g00' đến 20g15'` },
]

const DAY = [
    { id: 1, title: `Thứ 2` },
    { id: 2, title: `Thứ 3` },
    { id: 3, title: `Thứ 4` },
    { id: 4, title: `Thứ 5` },
    { id: 5, title: `Thứ 6` },
    { id: 6, title: `Thứ 7` },
    { id: 7, title: `Chủ Nhật` },

]
