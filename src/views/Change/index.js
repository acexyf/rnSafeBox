import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {Button} from 'native-base';
import storage from '../../utils/storage';
import {showToast, showAlert} from '../../utils/index';
import {Sae} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const {getData, storeData} = storage;
// 修改入口密码
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 当前保存的密码
      now: '',
      // 用户输入的旧密码
      oldPwd: '',
      // 用户输入的新密码
      newPwd: '',
      // 再次输入的新密码
      repeatPwd: '',
      // 是否显示旧密码输入框
      showOldPwd: false,
    };
  }
  async componentDidMount() {
    const entrance = await getData('entrance');
    if (typeof entrance === 'string' && entrance) {
      this.setState({
        showOldPwd: true,
        now: entrance,
      });
      this.props.navigation.setOptions({
        title: '修改入口密码',
      });
    } else {
      this.setState({
        showOldPwd: false,
      });
      this.props.navigation.setOptions({
        title: '设置入口密码',
      });
    }
  }
  async clickSubmit() {
    const {oldPwd, newPwd, repeatPwd, showOldPwd, now} = this.state;

    if (showOldPwd && !oldPwd) {
      showToast('请输入旧入口密码');
      return;
    }
    if (!newPwd) {
      showToast('请输入新入口密码');
      return;
    }
    if (showOldPwd && oldPwd !== now) {
      showToast('旧密码不正确');
      return;
    }
    if (newPwd.length < 4) {
      showToast('新入口密码至少为四位');
      return;
    }
    if (newPwd !== repeatPwd) {
      showToast('两次密码输入不一致');
      return;
    }
    if (showOldPwd && oldPwd === newPwd) {
      showToast('新旧两次密码不能相同');
      return;
    }

    await storeData('entrance', newPwd);
    showAlert(
      '成功',
      showOldPwd ? '入口密码修改成功，请牢记' : '入口密码设置成功，请牢记',
      [
        {
          text: '确定',
          onPress: () => {
            this.props.navigation.goBack();
          },
        },
      ],
    );
  }
  render() {
    const {showOldPwd} = this.state;
    return (
      <View style={styles.box}>
        {showOldPwd && (
          <View style={styles.formLine}>
            {/*
              <Input
                placeholder="请输入入口密码"
                label="入口密码"
                secureTextEntry={true}
                onChangeText={value => this.setState({oldPwd: value})}
              />
              <Text style={styles.formLabel}>请输入旧入口密码</Text>
            */}
            <Sae
              style={{
                width: '100%',
                borderBottomColor: '#f0f0f0',
                borderBottomWidth: 1,
              }}
              label={'请输入旧入口密码'}
              secureTextEntry={true}
              iconClass={FontAwesomeIcon}
              iconName={'lock'}
              iconColor={'#666'}
              inputPadding={16}
              labelHeight={24}
              borderHeight={1}
              autoCapitalize={'none'}
              inputStyle={{
                color: '#333',
                borderBottomColor: '#f0f0f0',
                borderBottomWidth: 1,
              }}
              labelStyle={{color: '#999'}}
              autoCorrect={false}
              onChangeText={value => this.setState({oldPwd: value})}
            />
          </View>
        )}
        <View style={styles.formLine}>
          {/*
          <Input
            placeholder="请再次输入"
            label="新的入口密码"
            secureTextEntry={true}
            onChangeText={value => this.setState({newPwd: value})}
          />
          <Text style={styles.formLabel}>请输入新的入口密码</Text>
          */}
          <Sae
            style={{
              width: '100%',
              borderBottomColor: '#f0f0f0',
              borderBottomWidth: 1,
            }}
            label={'新的入口密码'}
            secureTextEntry={true}
            iconClass={FontAwesomeIcon}
            iconName={'lock'}
            iconColor={'#666'}
            inputPadding={16}
            labelHeight={24}
            borderHeight={1}
            autoCapitalize={'none'}
            inputStyle={{
              color: '#333',
              borderBottomColor: '#f0f0f0',
              borderBottomWidth: 1,
            }}
            labelStyle={{color: '#999'}}
            autoCorrect={false}
            onChangeText={value => this.setState({newPwd: value})}
          />
        </View>
        <View style={styles.formLine}>
          {/*
          <Input
            placeholder="请再次输入"
            label="新的入口密码"
            secureTextEntry={true}
            onChangeText={value => this.setState({newPwd: value})}
          />
          <Text style={styles.formLabel}>请输入新的入口密码</Text>
          */}
          <Sae
            style={{
              width: '100%',
              borderBottomColor: '#f0f0f0',
              borderBottomWidth: 1,
            }}
            label={'请再次输入密码'}
            secureTextEntry={true}
            iconClass={FontAwesomeIcon}
            iconName={'lock'}
            iconColor={'#666'}
            inputPadding={16}
            labelHeight={24}
            borderHeight={1}
            autoCapitalize={'none'}
            inputStyle={{
              color: '#333',
              borderBottomColor: '#f0f0f0',
              borderBottomWidth: 1,
            }}
            labelStyle={{color: '#999'}}
            autoCorrect={false}
            onChangeText={value => this.setState({repeatPwd: value})}
          />
        </View>
        <View style={styles.tipBox}>
          <Text style={styles.tip}>密码重要，请牢记</Text>
        </View>
        <View style={styles.confirm}>
          <Button
            onPress={() => this.clickSubmit()}
            buttonStyle={{backgroundColor: '#409EFF'}}>
            确定
          </Button>
        </View>
      </View>
    );
  }
}
export default Index;
