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

import Popover from 'react-native-popover-view';

const Stack = createNativeStackNavigator();

import styles from './styles';

import Login from '../views/Login';
import Home from '../views/Home';
import Passwd from '../views/Passwd';
import Change from '../views/Change';
import About from '../views/About';
import bus from '../utils/bus.js';
// import {ListItem} from 'react-native-elements';

export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
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
  }
  render() {
    const {isLogin, popoverList} = this.state;
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
                                <Text styles={styles.popoverLineText}>
                                  {item.name}
                                </Text>
                              </View>
                            </TouchableWithoutFeedback>
                          ))}
                        </View>
                      </Popover>
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
