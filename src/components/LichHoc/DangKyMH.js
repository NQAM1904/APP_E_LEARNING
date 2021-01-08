import React, { Component } from 'react';
import { Text, View } from 'react-native';
import BottomSheet from '../Custom/BottomSheet';
import Header from '../Custom/Header';
import { API_URL, userData } from '../../config/setting';
class DangKyMH extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }
    getMonHoc = () => {
        const url = API_URL + `/GetMonHocAllowDK?id=${userData.IDSTUDENT}`
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    data: result
                }, () => console.log(this.state.data))
            })
            .catch(error => console.log('error', error));
    }

    render() {
        return (
            <View>
                <Header
                    title="Đăng ký môn học"
                    onPressBackButton={() => this.props.navigation.goBack()}
                />
                <Text style={{ margin: 10 }}>Môn học</Text>
                <BottomSheet placeholder="Chọn Môn Học" data={this.state.data.Data} />
            </View>
        );

    }
}
export default DangKyMH;