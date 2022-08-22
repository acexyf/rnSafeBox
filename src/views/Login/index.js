import React, {Component} from 'react';
import {View, Text, Image, Platform} from 'react-native';
import {Input, Button} from 'react-native-elements';
import styles from './styles.js';
import bus from '../../utils/bus';
import {showToast} from '../../utils/index';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import storage from '../../utils/storage';
import {APP_NAME} from '../../utils/config';
const {getData} = storage;
import {Sae} from 'react-native-textinput-effects';
import FingerprintScanner from 'react-native-fingerprint-scanner';

// 登录页，修改密码
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 当前storage中的密码
      now: '',
      pwd: '',
      sensorAvailable: false,
    };
  }
  async getStorage() {
    let now = await getData('entrance');
    // console.log('now', now);

    if (typeof now === 'string' && now) {
      this.setState({
        now,
      });
    } else {
      // 没有设置入口密码，直接进入
      bus.emit('login');
    }
  }
  async componentDidMount() {
    await this.getStorage();

    if (this.state.now) {
      let available = await this.checkSensorsAvailable();

      if (available) {
        let auth = await this.scanAuth();
        if (auth) {
          bus.emit('login');
        }
      }
    }

    // setTimeout(() => {
    //   bus.emit('login');
    // }, 500);
  }
  componentWillUnmount = () => {
    FingerprintScanner.release();
  };
  // 判断指纹传感器是否可用
  async checkSensorsAvailable() {
    let flag = false;
    try {
      let res = await FingerprintScanner.isSensorAvailable();
      flag = true;
    } catch (error) {}
    return flag;
  }
  async scanAuth() {
    let flag = false;
    try {
      let res = await FingerprintScanner.authenticate({
        title: '指纹登录',
        description: '请触摸指纹传感器',
        cancelButton: '取消',
      });
      if (res === true) {
        flag = true;
      }
    } catch (error) {}
    return flag;
  }
  // 判断平台
  requiresLegacyAuthentication() {
    return Platform.Version < 23;
  }
  clickSubmit() {
    const {pwd, now} = this.state;

    if (!pwd) {
      showToast('请输入入口密码');
      return;
    }
    if (pwd !== now) {
      showToast('入口密码不正确');
      return;
    }
    bus.emit('login');
  }
  render() {
    const {pwd} = this.state;
    return (
      <View style={styles.box}>
        <Image
          style={styles.icon}
          source={require('./images/icon.png')}></Image>
        <View>
          <Text style={styles.title}>{APP_NAME}</Text>
        </View>
        <View style={styles.input}>
          {/*
        <Input
            value={pwd}
            placeholder="请输入入口密码"
            label="入口密码"
            secureTextEntry={true}
            onChangeText={value => this.setState({pwd: value})}
          />
        */}
          <Sae
            value={pwd}
            style={{width: '100%'}}
            label={'入口密码'}
            secureTextEntry={true}
            iconClass={FontAwesomeIcon}
            iconName={'lock'}
            iconColor={'#333'}
            inputPadding={10}
            labelHeight={30}
            borderHeight={2}
            autoCapitalize={'none'}
            inputStyle={{color: '#333'}}
            autoCorrect={false}
            onChangeText={value => this.setState({pwd: value})}
          />
        </View>
        <View style={styles.btn}>
          <Button
            raised={true}
            onPress={() => this.clickSubmit()}
            buttonStyle={{backgroundColor: '#409EFF'}}
            title="确定"></Button>
        </View>
      </View>
    );
  }
}
export default Index;
