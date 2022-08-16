import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async (key = '') => {
  try {
    return await AsyncStorage.getItem(`@storage_${key}`);
  } catch (e) {
    console.log('error getData', e);

    // error reading value
    return '';
  }
};
const storeData = async (key = '', value = '') => {
  try {
    await AsyncStorage.setItem(`@storage_${key}`, value);
  } catch (e) {
    // saving error
    console.log('storeData error', e);
  }
};
const storeObjectData = async (key, obj) => {
  if (typeof obj !== 'object') {
    console.log('obj is not a object');
    return;
  }
  try {
    await AsyncStorage.setItem(`@storage_${key}`, JSON.stringify(obj));
  } catch (e) {
    // saving error
    console.log('storeObjectData error', e);
  }
};

const getObjectData = async (key = '') => {
  let res = await getData(key);

  if (res) {
    try {
      return JSON.parse(res);
    } catch (error) {
      console.log('getObjectData error', e);
      return {};
    }
  } else {
    return {};
  }
};
const getAllStorageKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    // read key error
    console.log('getAllStorage error', e);
  }
  return keys;
};
const multiGetStorage = async (keys = []) => {
  let values = [];
  try {
    values = await AsyncStorage.multiGet(keys);
  } catch (e) {
    // read error
    console.log('multiGetStorage error', e);
  }
  return values;
};

const removeStorage = async (key = '') => {
  try {
    await AsyncStorage.removeItem(`@storage_${key}`);
  } catch (e) {
    // remove error
    console.log('removeStorage error', e);
  }
};
export default {
  getData,
  getObjectData,
  storeData,
  storeObjectData,
  getAllStorageKeys,
  multiGetStorage,
  removeStorage,
};
