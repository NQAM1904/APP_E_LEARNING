import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, StatusBar} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import {connect} from 'react-redux';

const time = 250;
const height = StatusBar.currentHeight + 56;
const AlertAnimated = React.memo((props) => {
  const animation = new Animated.Value(-height);

  useEffect(() => {
    if (props.data.form !== null && props.data.message !== null) {
      slideDown();
    }
  }, [props.data]);

  const slideDown = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: time,
      useNativeDriver: true,
    }).start(() =>
      setTimeout(() => {
        slideUp();
      }, 1500),
    );
  };
  const slideUp = () => {
    Animated.timing(animation, {
      toValue: -height,
      duration: time,
      useNativeDriver: true,
    }).start();
  };
  const renderIcon = () => {
    switch (props.data.form) {
      case 'warn':
        return (
          <FontAwesome5 name="exclamation-triangle" color={'white'} size={32} />
        );
      case 'error':
        return (
          <FontAwesome5 name="exclamation-circle" color={'white'} size={32} />
        );
      case 'success':
        return <FontAwesome5 name="laugh-beam" color={'white'} size={32} />;
      default:
        return <FontAwesome5 name="laugh-beam" color={'white'} size={32} />;
    }
  };
  const formTitle = () => {
    switch (props.data.form) {
      case 'warn':
        return 'Warning';
      case 'error':
        return 'Error';
      case 'success':
        return 'Success';
      default:
        return 'Success';
    }
  };
  const formColor = () => {
    switch (props.data.form) {
      case 'warn':
        return '#FAAD14';
      case 'error':
        return '#FF4D4F';
      case 'success':
        return '#2EB553';
      default:
        return '#2EB553';
    }
  };
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{translateY: animation}],
          backgroundColor: formColor(),
        },
      ]}>
      {renderIcon()}
      <View>
        <Text style={styles.form}>{formTitle()}</Text>
        <Text style={styles.message}>{props.data.message}</Text>
      </View>
    </Animated.View>
  );
});

const mapStateToProps = (state) => {
  return {
    data: state.showAlertReducer,
  };
};

export default connect(mapStateToProps, null)(AlertAnimated);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAAD14',
    height: height,
    paddingTop: 15,
    position: 'absolute',
    top: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  form: {
    fontSize: 16,
    color: 'white',
    marginLeft: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: 'white',
    marginHorizontal: 16,
    flex: 1,
  },
});
