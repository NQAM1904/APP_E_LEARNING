import React, { Component } from 'react';
import { Text, View } from 'react-native';
import BottomSheet from '../Custom/BottomSheet';
import Header from '../Custom/Header';

class DangKyMH extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <View>
                <Header
                    title="Đăng ký môn học"
                    onPressBackButton={() => this.props.navigation.goBack()}
                />
                <Text style={{ margin: 10 }}>Môn học</Text>
                <BottomSheet placeholder="asdsasdasdasdad" />
            </View>
        );

    }
}
export default DangKyMH;