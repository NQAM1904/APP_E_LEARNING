import { Sizes } from '@dungdang/react-native-basic';
import React, { Component } from 'react';
import {
  View,
  TextInput,
  Animated,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class FloatingLabelInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      hidePassword: true,
    };
    this.slideLabel = new Animated.Value(0);
  }

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(
      this.props.value === '' ? 0 : 1,
    );
  }

  handleFocus = () => {
    this.setState({ isFocused: true });
    Animated.timing(this.slideLabel, {
      toValue: Sizes.h32,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      this.slideLabel.setValue(0);
    });
  };

  handleBlur = () => {
    this.setState({ isFocused: false });
  };

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }

  render() {
    const { title, ...props } = this.props;
    const { isFocused } = this.state;
    const labelStyle = {
      color: '#8C8C8C',
      padding: 0,
      position: 'absolute',
      left: Sizes.h32,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [Sizes.h32, Sizes.h16],
      }),
      // transform: [
      //    {
      //       translateY: this.slideLabel,
      //    },
      // ],
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [Sizes.h32, Sizes.h26],
      }),
    };

    return (
      <View
        style={[
          styles.container,
          this.props.isChangePassword && isFocused && { borderColor: '#1890FF' },
          this.props.style,
        ]}>
        <Animated.Text style={labelStyle}>{title}</Animated.Text>
        <TextInput
          {...props}
          autoCorrect={false}
          autoCompleteType="off"
          style={styles.textInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    borderColor: '#E8E8E8',
    borderRadius: Sizes.h16,
    borderWidth: 1,
    // paddingVertical: Sizes.h16,

    height: Sizes.h28 * 4,
    justifyContent: 'center',
  },
  textInput: {
    position: 'absolute',
    width: '90%',
    left: Sizes.h32,
    bottom: Sizes.h16,
    fontSize: Sizes.h32,
    padding: 0,
    textAlignVertical: 'bottom',
    // backgroundColor: '#00000036',
  },
});
