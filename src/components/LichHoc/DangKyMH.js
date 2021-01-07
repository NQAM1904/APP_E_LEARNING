import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Header from '../Custom/Header';
import BottomSheet from '../Custom/BottomSheet';
class DangKyMH extends Component {
    render() {
        return (
            <View>
                <Header
                    title="Đăng ký môn học"
                    onPressBackButton={() => this.props.navigation.goBack()}
                />
                <BottomSheet />
            </View>
        );

    }
}
export default DangKyMH;