import React, {Component, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {APP_NAME} from '../utils/config';
import {Input} from 'native-base';
import Popover from 'react-native-popover-view';

import {debounce} from 'lodash-es';

const Stack = createNativeStackNavigator();

import styles from './styles';

import Login from '../views/Login';
import Home from '../views/Home';
import Passwd from '../views/Passwd';
import Change from '../views/Change';
import About from '../views/About';
import bus from '../utils/bus.js';

export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 是否已登录
      isLogin: false,
      // 是否进入搜索模式
      isSearch: false,
      popoverList: [
        {
          id: 'change',
          name: '修改入口密码',
        },
        {
          id: 'about',
          name: '关于',
        },
      ],
    };
    this.getLogin = this.getLogin.bind(this);
    this.handleInputChangeDebounce = debounce(this.handleInputChange, 300);
  }
  getLogin() {
    this.setState({
      isLogin: true,
    });
  }
  componentDidMount() {
    bus.addListener('login', this.getLogin);
  }
  componentWillUnmount() {
    bus.removeListener('login', this.getLogin);
    this.handleInputChangeDebounce.cancel();
  }
  //进入或退出搜索模式
  enterOrLeaveSearch(flag = true) {
    if (!flag) {
      // 退出搜索时清除搜索关键词
      bus.emit('searchKey', '');
    }
    this.setState({
      isSearch: flag,
    });
  }
  handleInputChange(val) {
    bus.emit('searchKey', val);
  }
  render() {
    const {isLogin, isSearch, popoverList} = this.state;
    return (
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#128574',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'normal',
          },
        }}>
        {isLogin ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={({navigation}) => {
                return {
                  title: APP_NAME,
                  headerRight: () => {
                    const [showPopover, setPopover] = useState(false);

                    const clickPopoverItem = item => {
                      const {id} = item;
                      setPopover(false);
                      if (id === 'change') {
                        navigation.navigate('Change');
                      } else if (id === 'about') {
                        navigation.navigate('About');
                      }
                    };
                    return (
                      <>
                        {isSearch ? (
                          <View style={styles.searchInputBox}>
                            <Input
                              variant="underlined"
                              autoFocus={true}
                              style={{
                                height: 30,
                                color: '#ffffff',
                                fontSize: 12,
                                padding: 0,
                                margin: 0,
                                paddingLeft: 6,
                              }}
                              focusOutlineColor="#ffffff"
                              invalidOutlineColor="#ffffff"
                              isFocused={true}
                              isHovered={true}
                              size="sm"
                              borderBottomColor={'#fff'}
                              InputLeftElement={
                                <Icon
                                  name={'search'}
                                  size={20}
                                  color="#ffffff"></Icon>
                              }
                              onChangeText={this.handleInputChangeDebounce}
                            />
                          </View>
                        ) : (
                          <TouchableOpacity
                            onPress={() => this.enterOrLeaveSearch(true)}>
                            <View style={styles.searchIcon}>
                              <Icon name={'search'} size={26} color="#fff" />
                            </View>
                          </TouchableOpacity>
                        )}

                        <Popover
                          isVisible={showPopover}
                          onRequestClose={() => setPopover(false)}
                          backgroundStyle={{opacity: 0.3}}
                          offset={-20}
                          from={
                            <TouchableNativeFeedback
                              background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
                              onPress={() => setPopover(true)}>
                              <View>
                                <Icon
                                  name={'ellipsis-vertical'}
                                  size={26}
                                  color="#fff"
                                />
                              </View>
                            </TouchableNativeFeedback>
                          }>
                          <View style={styles.popoverBox}>
                            {popoverList.map(item => (
                              <TouchableWithoutFeedback
                                key={item.id}
                                onPress={() => clickPopoverItem(item)}>
                                <View key={item.id} style={styles.popoverLine}>
                                  <Text style={styles.popoverLineText}>
                                    {item.name}
                                  </Text>
                                </View>
                              </TouchableWithoutFeedback>
                            ))}
                          </View>
                        </Popover>
                      </>
                    );
                  },
                  headerTitle: () => {
                    return (
                      <View>
                        {isSearch ? (
                          <TouchableOpacity
                            onPress={() => this.enterOrLeaveSearch(false)}>
                            <Icon
                              name={'ios-arrow-back'}
                              size={26}
                              color="#fff"></Icon>
                          </TouchableOpacity>
                        ) : (
                          <Text style={styles.headerTitle}>{APP_NAME}</Text>
                        )}
                      </View>
                    );
                  },
                };
              }}
            />
            <Stack.Screen
              name="Passwd"
              component={Passwd}
              options={{title: '密码'}}
            />
            <Stack.Screen
              name="Change"
              component={Change}
              options={{title: '修改入口密码'}}
            />
            <Stack.Screen
              name="About"
              component={About}
              options={{title: '关于'}}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    );
  }
}
