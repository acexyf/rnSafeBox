import React, {Component} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import styles from './styles';
import {CLASSIFY} from '../../utils/enum.js';
import {showToast, showAlert, getUUID} from '../../utils/index';
import storage from '../../utils/storage';
import {Button, Input, Text, Actionsheet, Box} from 'native-base';
const {getObjectData, storeObjectData, removeStorage} = storage;

// 新建密码和修改密码
class Index extends Component {
  constructor(props) {
    super(props);
    const {height} = Dimensions.get('window');

    this.state = {
      isVisible: false,
      list: CLASSIFY,
      type: '',
      id: '',
      classify: '',
      // 用户输入的数据
      pwdType: '',
      pwdTypeValue: '',
      title: '',
      site: '',
      username: '',
      password: '',
      explain: '',
      windowHeight: height,
      inputSize: 'xl',
      labelSize: 18,
      labelColor: 'dark.300',
    };
  }
  async componentDidMount() {
    const {navigation, route} = this.props;
    const {type = '', id = '', classify = ''} = route.params;

    if (type === 'add') {
      navigation.setOptions({
        title: '创建密码',
      });
      this.setState({
        type,
        id,
        classify,
      });
    } else if (type === 'edit') {
      navigation.setOptions({
        title: '修改密码',
      });

      const res = await getObjectData(`classify-${classify}-${id}`);

      const {
        title = '',
        username = '',
        password = '',
        site = '',
        explain = '',
      } = res;
      let pwdType = '';
      CLASSIFY.map(el => {
        if (el.id === classify) {
          pwdType = el.name;
        }
      });
      this.setState({
        pwdType,
        pwdTypeValue: classify,
        title,
        site,
        username,
        password,
        explain,

        type,
        id,
        classify,
      });
    }
  }
  showSheet() {
    // 新增密码才能修改类型
    const {type} = this.state;
    if (type === 'add') {
      this.setState({
        isVisible: true,
      });
    } else {
      showToast('不能修改密码类型');
    }
  }
  closeSheet() {
    this.setState({
      isVisible: false,
    });
  }
  clickTypeItem(item, index) {
    this.setState({
      isVisible: false,
      pwdType: item.name,
      pwdTypeValue: item.id,
    });
  }
  validate() {
    const {pwdType, pwdTypeValue, title, username, password} = this.state;
    if (!pwdType && !pwdTypeValue) {
      showToast('请选择密码类型');
      return false;
    }
    if (!title) {
      showToast('请输入标题');
      return false;
    }

    if (!username) {
      showToast('请输入用户名');
      return false;
    }
    if (!password) {
      showToast('请输入密码');
      return false;
    }
    return true;
  }
  clickCancel() {
    this.props.navigation.goBack();
  }

  clickDelete() {
    const {classify, id} = this.state;

    // todo ios
    // Alert.prompt('提示', '确认删除该密码吗？', [
    //   {text: '取消'},
    //   {
    //     text: '确定',
    //     onPress: () => {
    //       this.props.navigation.goBack();
    //     },
    //   },
    // ]);

    Alert.alert('提示', '确认删除该密码吗？', [
      {text: '取消'},
      {
        text: '确定',
        onPress: async () => {
          await removeStorage(`classify-${classify}-${id}`);
          this.props.navigation.goBack();
        },
      },
    ]);
  }
  async clickSave() {
    const {
      pwdTypeValue,
      title,
      username,
      password,
      site,
      explain,
      classify,
      id,
    } = this.state;
    const flag = this.validate();
    if (!flag) {
      return;
    }

    await storeObjectData(`classify-${classify}-${id}`, {
      classify: pwdTypeValue,
      id,
      title,
      username,
      password,
      site,
      explain,
    });
    showToast('更新成功');
    this.props.navigation.goBack();
  }
  async clickCreate() {
    const flag = this.validate();
    if (!flag) {
      return;
    }
    const {pwdTypeValue, title, username, password, site, explain} = this.state;
    const uuid = getUUID();

    await storeObjectData(`classify-${pwdTypeValue}-${uuid}`, {
      classify: pwdTypeValue,
      id: uuid,
      title,
      username,
      password,
      site,
      explain,
    });
    showToast('创建成功');
    this.props.navigation.goBack();
  }
  render() {
    const {
      isVisible,
      list,
      type,
      pwdType,
      pwdTypeValue,
      title,
      site,
      username,
      password,
      explain,
      windowHeight,
      inputSize,
      labelSize,
      labelColor,
    } = this.state;
    return (
      <View style={styles.box}>
        <ScrollView>
          <View style={[styles.container, {minHeight: windowHeight}]}>
            <TouchableWithoutFeedback onPress={() => this.showSheet()}>
              <View style={styles.formLine}>
                <Text
                  fontSize={labelSize}
                  color={labelColor}
                  fontWeight="bold"
                  bold={true}>
                  密码类型<Text style={styles.need}>*</Text>
                </Text>
                <Input
                  value={pwdType}
                  ref="input"
                  placeholder="请选择密码类型"
                  variant="underlined"
                  isDisabled={true}
                  size={inputSize}
                />
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.formLine}>
              <Text
                fontSize={labelSize}
                color={labelColor}
                fontWeight="bold"
                bold={true}>
                标题<Text style={styles.need}>*</Text>
              </Text>
              <Input
                value={title}
                placeholder="请输入标题"
                onChangeText={value => this.setState({title: value})}
                variant="underlined"
                size={inputSize}
              />
            </View>
            <View style={styles.formLine}>
              <Text
                fontSize={labelSize}
                color={labelColor}
                fontWeight="bold"
                bold={true}>
                网址
              </Text>
              <Input
                value={site}
                placeholder="请输入网址"
                onChangeText={value => this.setState({site: value})}
                variant="underlined"
                size={inputSize}
              />
            </View>
            <View style={styles.formLine}>
              <Text
                fontSize={labelSize}
                color={labelColor}
                fontWeight="bold"
                bold={true}>
                用户名<Text style={styles.need}>*</Text>
              </Text>
              <Input
                value={username}
                placeholder="请输入用户名"
                onChangeText={value => this.setState({username: value})}
                variant="underlined"
                size={inputSize}
              />
            </View>
            <View style={styles.formLine}>
              <Text
                fontSize={labelSize}
                color={labelColor}
                fontWeight="bold"
                bold={true}>
                密码<Text style={styles.need}>*</Text>
              </Text>
              <Input
                value={password}
                placeholder="请输入密码"
                onChangeText={value => this.setState({password: value})}
                variant="underlined"
                size={inputSize}
              />
            </View>
            <View style={styles.formLine}>
              <Text
                fontSize={labelSize}
                color={labelColor}
                fontWeight="bold"
                bold={true}>
                说明
              </Text>
              <Input
                value={explain}
                placeholder="请输入说明"
                onChangeText={value => this.setState({explain: value})}
                variant="underlined"
                size={inputSize}
              />
            </View>
            {type === 'add' ? (
              <View style={styles.btnAddBox}>
                <Button onPress={() => this.clickCreate()}>新建</Button>
              </View>
            ) : (
              <View style={styles.btnList}>
                <View style={styles.btnBox}>
                  <Button
                    colorScheme="coolGray"
                    onPress={() => this.clickCancel()}>
                    取消
                  </Button>
                </View>
                <View style={styles.btnBox}>
                  <Button
                    colorScheme="danger"
                    onPress={() => this.clickDelete()}>
                    删除
                  </Button>
                </View>
                <View style={styles.btnBox}>
                  <Button onPress={() => this.clickSave()}>保存</Button>
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        <Actionsheet isOpen={isVisible} onClose={() => this.closeSheet()}>
          <Actionsheet.Content>
            {list.map((el, index) => {
              return (
                <Actionsheet.Item
                  key={index}
                  onPress={() => this.clickTypeItem(el, index)}>
                  {el.name}
                </Actionsheet.Item>
              );
            })}
          </Actionsheet.Content>
        </Actionsheet>
        {/*
        <BottomSheet
          isVisible={isVisible}
          containerStyle={{
            backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)',
          }}>
          <View style={styles.flexBox}>
            <Button
              containerStyle={{width: 60}}
              title="取消"
              type="clear"
              onPress={() => this.closeSheet()}></Button>
          </View>
          {list.map((el, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => this.clickTypeItem(el, index)}>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title
                    style={{
                      color: el.id === pwdTypeValue ? '#E81F63' : '#666',
                    }}>
                    {el.name}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableWithoutFeedback>
          ))}
        </BottomSheet>
                    */}
      </View>
    );
  }
}
export default Index;
