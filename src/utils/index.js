import {ToastAndroid, Alert} from 'react-native';

export function showToast(msg = '') {
  ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
}
export function showAlert(
  title = '提示',
  message = '',
  buttons = [{text: '确定'}],
) {
  Alert.alert(title, message, buttons);
}

export function getUUID() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
}
