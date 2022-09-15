


# 安全密码箱


使用React Native 0.67.0开发


## 安卓打包

```bash
react-native bundle --platform android --dev false --entry-file index.js  --bundle-output android/app/src/main/assets/index.android.bundle  --assets-dest android/app/src/main/res/
```



```bash
cd android && ./gradlew clean && ./gradlew assembleRelease
```



## todo


* 支持指纹识别进入主页（done）
* 箭头添加动画效果（done）
* 搜索功能（done）
* 导出导入
