import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CLASSIFY} from '../../utils/enum';
import storage from '../../utils/storage';

import {showToast, showAlert} from '../../utils/index';

import {BoxShadow} from 'react-native-shadow';

import Clipboard from '@react-native-clipboard/clipboard';

import ListItem from './list-item';

import bus from '../../utils/bus';

const {getData, getAllStorageKeys, multiGetStorage} = storage;

// 主页
class Index extends Component {
  constructor() {
    super();
    const {width} = Dimensions.get('window');

    this.state = {
      // 结构 [ id: '0', name: 'XX',toggle: true, children: [{type: '',id: '', }]]
      list: [],
      windowWidth: width,
      shadowOpt: {
        width: 30,
        height: 30,
        color: '#000',
        border: 20,
        radius: 15,
        opacity: 0.1,
        x: 0,
        y: 25,
        style: {
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        },
      },
    };

    this.getSearchKey = this.getSearchKey.bind(this);
  }

  async componentDidMount() {
    bus.addListener('searchKey', this.getSearchKey);
    await this.updateList();

    this._focus = this.props.navigation.addListener('focus', async () => {
      await this.updateList();
    });
  }

  getSearchKey(val) {
    this.updateList(val);
  }

  componentWillUnrmount() {
    this._focus();
    bus.removeListener('searchKey', this.getSearchKey);
  }
  async updateList(search = '') {
    const allKeys = await getAllStorageKeys();
    const filterKeys = allKeys.filter(
      el => el.indexOf('@storage_classify-') !== -1,
    );
    const allData = await multiGetStorage(filterKeys);
    const tempDist = {};
    const list = [];

    for (let i = 0; i < allData.length; i++) {
      const item = allData[i];
      let temp = null;
      if (item.length === 2) {
        try {
          temp = JSON.parse(item[1]);
        } catch (error) {}
      }

      if (temp) {
        let addTmp = false;

        if (search) {
          if (temp.title.indexOf(search) !== -1) {
            addTmp = true;
          }
        } else {
          addTmp = true;
        }

        if (addTmp) {
          if (typeof tempDist[temp.classify] === 'undefined') {
            tempDist[temp.classify] = [temp];
          } else {
            tempDist[temp.classify].push(temp);
          }
        }
      }
    }
    for (let i = 0; i < CLASSIFY.length; i++) {
      const item = Object.assign({}, CLASSIFY[i]);
      // 原来列表中的
      const findExist = this.state.list.find(el => el.id === item.id);

      if (findExist && typeof findExist.toggle === 'boolean') {
        item.toggle = findExist.toggle;
      } else {
        item.toggle = false;
      }
      if (search) {
        item.toggle = true;
      }

      if (typeof tempDist[item.id] === 'undefined') {
        item.children = [];
      } else {
        item.children = tempDist[item.id];
      }
      if (search) {
        if (item.children.length) {
          list.push(item);
        }
      } else {
        list.push(item);
      }
    }
    this.setState({
      list,
    });
  }
  clickListItem(item, index) {
    const {list} = this.state;
    list[index].toggle = !list[index].toggle;
    this.setState({
      list,
    });
  }
  async clickAddBtn() {
    const entrance = await getData('entrance');
    if (typeof entrance === 'string' && entrance) {
      this.props.navigation.navigate('Passwd', {
        type: 'add',
      });
    } else {
      showAlert('提示', '请点击右上角先设置入口密码');
    }
  }
  clickItem(item, itm) {
    const {classify, id} = itm;
    this.props.navigation.navigate('Passwd', {
      type: 'edit',
      id: id,
      classify,
    });
  }
  clickCopy(text, type) {
    Clipboard.setString(text);
    showToast(type === 1 ? '用户名复制成功' : '密码复制成功');
  }
  render() {
    const {list, windowWidth, shadowOpt} = this.state;
    return (
      <View style={styles.box}>
        <ScrollView>
          {list.map((item, index) => {
            return (
              <ListItem
                clickListItem={this.clickListItem.bind(this)}
                clickItem={this.clickItem.bind(this)}
                key={index}
                item={item}
                index={index}></ListItem>
            );
          })}
        </ScrollView>
        <TouchableWithoutFeedback onPress={() => this.clickAddBtn()}>
          <View style={styles.fixedAddBox}>
            <BoxShadow setting={shadowOpt}>
              <View style={styles.fixedAdd}>
                <View style={styles.fixedAddIcon}>
                  <Icon name={'plus'} size={30} color="#fff" />
                </View>
              </View>
            </BoxShadow>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
export default Index;
