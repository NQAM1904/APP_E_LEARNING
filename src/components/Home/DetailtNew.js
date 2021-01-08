import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import HTML from 'react-native-render-html';
import { API_URL } from '../../config/setting';
import Header from '../Custom/Header';

export default class DetailtNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    const url = API_URL + `/GetNews?id=${this.props.route.params.id}`
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => { this.setState({ data: result[0] }) })
      .catch(error => console.log('error', error));
  }
  render() {
    return (
      <View style={styles.container}>
        <Header title={this.props.route.params.title} onPressBackButton={() => this.props.navigation.goBack()} />
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
          <Text style={styles.title}>{this.state.data.TENEVENT}</Text>
          <View style={styles.subTitle}>
            <Text style={styles.textSub}>Tác giả: {this.state.data.FULLNAME}</Text>
            <Text style={styles.textSub}>{this.state.data.THOIGIANEV}</Text>
          </View>
          <HTML source={{ html: this.state.data.MOTA }} containerStyle={{ flex: 1, }} />

        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  textSub: {
    fontSize: 12,
    color: 'gray'
  },
})
