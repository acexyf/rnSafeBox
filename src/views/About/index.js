import React, {Component} from 'react';
import {View, Text, Linking, TouchableWithoutFeedback} from 'react-native';
import styles from './styles';
import {version} from '../../../package.json';
import {APP_NAME} from '../../utils/config';

class Index extends Component {
  openHome() {
    console.log('open');
    Linking.openURL('https://github.com/acexyf/rnSafeBox');
  }
  render() {
    return (
      <View style={styles.box}>
        <View style={styles.line}>
          <Text style={styles.lineText}>应用：{APP_NAME}</Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.lineText}>版本：v{version}</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => this.openHome()}>
          <View style={styles.line}>
            <Text style={[styles.under, styles.lineText]}>Github：查看</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
export default Index;
