import React, {Component} from 'react';
import {
  View,
  Text,
  Linking,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {version} from '../../../package.json';
import {APP_NAME} from '../../utils/config';
import {Button} from 'native-base';
class Index extends Component {
  constructor() {
    super();
    this.state = {
      colors: [
        'rose',
        'pink',
        'fuchsia',
        'purple',
        'violet',
        'indigo',
        'blue',
        'lightBlue',
        'cyan',
        'teal',
        'emerald',
        'tertiary',
        'green',
        'lime',
        'yellow',
        'amber',
        'orange',
        'red',
        'warmGray',
        'trueGray',
        'gray',
        'coolGray',
        'blueGray',
        'dark',
        'danger',
        'error',
        'success',
        'warning',
        'muted',
        'primary',
        'info',
        'secondary',
        'light',
      ],
    };
  }
  openHome() {
    console.log('open');
    Linking.openURL('https://github.com/acexyf/rnSafeBox');
  }
  render() {
    const {colors} = this.state;
    return (
      <View style={styles.box}>
        <ScrollView>
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
          {colors.map(el => {
            return (
              <Button colorScheme={el} key={el}>
                {el}
              </Button>
            );
          })}
          {/*
    
    

        */}
        </ScrollView>
      </View>
    );
  }
}
export default Index;
