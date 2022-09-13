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

// 动画效果
const ANIMATE_DURATION = 200;

export default class ListItem extends Component {
  constructor(props) {
    super(props);

    const {width} = Dimensions.get('window');

    const rotateDeg = new Animated.Value(0);

    this.state = {
      windowWidth: width,
      rotateDeg: rotateDeg,
    };
  }
  clickListItem(item, index) {
    if (item.toggle) {
      // 当前是打开的
      Animated.timing(this.state.rotateDeg, {
        toValue: 0,
        duration: ANIMATE_DURATION,
        useNativeDriver: true,
      }).start();
    } else {
      // 当前是关闭的
      Animated.timing(this.state.rotateDeg, {
        toValue: 1,
        duration: ANIMATE_DURATION,
        useNativeDriver: true,
      }).start();
    }

    this.props.clickListItem(item, index);
  }
  clickItem(item, itm) {
    this.props.clickItem(item, itm);
  }
  clickCopy() {}
  render() {
    const {item, index} = this.props;
    const {windowWidth, rotateDeg} = this.state;

    const rotate = rotateDeg.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        key={index}
        onPress={() => this.clickListItem(item, index)}>
        <View style={[styles.listItem, {width: windowWidth}]}>
          <Text style={styles.listItemTitle}>
            {item.name}（{item.children.length}）
          </Text>
          <Animated.View style={{transform: [{rotate: rotate}]}}>
            <Icon name="up" size={20} color="#333" />
          </Animated.View>
        </View>
        {item.toggle &&
          item.children.map((el, idx) => {
            return (
              <View key={idx} style={[styles.listChild, {width: windowWidth}]}>
                <TouchableWithoutFeedback
                  onPress={() => this.clickItem(item, el)}>
                  <View style={styles.listChildBox}>
                    <View>
                      <View>
                        <Text style={styles.listChildTitle}>{el.title}</Text>
                      </View>
                      <View style={styles.listChildLine}>
                        <View>
                          <Text style={styles.listChildLine.label}>
                            用户名：
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.listChildLine.valueBox}
                          onPress={() => this.clickCopy(el.username, 1)}>
                          <View>
                            <Text style={styles.listChildLine.value}>
                              {el.username}
                            </Text>
                          </View>
                          <View style={styles.listChildLine.copy}>
                            <Ionicons
                              name={'copy-outline'}
                              size={18}
                              color="#ACB5B2"
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.listChildLine}>
                        <View>
                          <Text style={styles.listChildLine.label}>密码：</Text>
                        </View>
                        <TouchableOpacity
                          style={styles.listChildLine.valueBox}
                          onPress={() => this.clickCopy(el.password, 2)}>
                          <View>
                            <Text style={styles.listChildLine.value}>
                              {el.password}
                            </Text>
                          </View>
                          <View style={styles.listChildLine.copy}>
                            <Ionicons
                              name={'copy-outline'}
                              size={18}
                              color="#ACB5B2"
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View>
                      <Icon name={'right'} size={16} color="#A1A3A6" />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            );
          })}
      </TouchableOpacity>
    );
  }
}
