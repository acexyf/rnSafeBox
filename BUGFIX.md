


# bug处理



## Duplicate resources
```
:app:mergeReleaseResources FAILED

Execution failed for task ':app:mergeReleaseResources'.

/android/app/build/generated/res/react/release/drawable-XXXX： Error: Duplicate resources
```

参考：
https://github.com/facebook/react-native/issues/22234

https://stackoverflow.com/questions/52668524/react-native-error-duplicate-resources-assets-coming-in-some-screens-and-not-c/52767101#52767101


https://stackoverflow.com/questions/47084810/react-native-android-duplicate-file-error-when-generating-apk


node_modules/react-native/react.gradle文件新增代码


```gradle
doFirst{ ... }
# 新增
doLast {
    def moveFunc = { resSuffix ->
        File originalDir = file("${resourcesDir}/drawable-${resSuffix}")
        if (originalDir.exists()) {
            File destDir = file("$buildDir/../src/main/res/drawable-${resSuffix}")
            ant.move(file: originalDir, tofile: destDir)
        }
    }
    def moveRawFunc = { dir ->
        File originalDir = file("${resourcesDir}/${dir}")
        if (originalDir.exists()) {
            File destDir = file("$buildDir/../src/main/res/${dir}")
            ant.move(file: originalDir, tofile: destDir)
        }
    }

    moveFunc.curry("ldpi").call()
    moveFunc.curry("mdpi").call()
    moveFunc.curry("hdpi").call()
    moveFunc.curry("xhdpi").call()
    moveFunc.curry("xxhdpi").call()
    moveFunc.curry("xxxhdpi").call()
    moveRawFunc.curry("raw").call()
}
```



## 打包app闪退








## XXX



```
TypeError: The "listener" argument must be of type Function. Received type undefined

This error is located at:
    in Router (at App.js:33)
    in EnsureSingleNavigator (at BaseNavigationContainer.tsx:430)
    in BaseNavigationContainer (at NavigationContainer.tsx:132)
    in ThemeProvider (at NavigationContainer.tsx:131)
    in NavigationContainerInner (at App.js:32)
    in ThemeProvider (at App.js:27)
    in RNCSafeAreaProvider (at SafeAreaContext.tsx:87)
    in SafeAreaProvider (at App.js:26)
    in App (at renderApplication.js:50)
    in RCTView (at View.js:32)
    in View (at AppContainer.js:92)
    in RCTView (at View.js:32)
    in View (at AppContainer.js:119)
    in AppContainer (at renderApplication.js:43)
    in rnSafeBox(RootComponent) (at renderApplication.js:60), js engine: hermes
```


## XXX

```
Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    in Router (at App.js:33)

```




### XXX


设置了代理，找到C盘用户文档的.gradle文件夹的gradle.properties，删掉proxy。


```
IOException: https://dl.google.com/android/repository/addons_list-3.xml
java.net.ConnectException: Connection refused: connect
IOException: https://dl.google.com/android/repository/addons_list-2.xml
java.net.ConnectException: Connection refused: connect
IOException: https://dl.google.com/android/repository/addons_list-1.xml
java.net.ConnectException: Connection refused: connect
Failed to download any source lists!
```


### XXX


```
Execution optimizations have been disabled for task ':app:mergeReleaseNativeLibs' to ensure correctness due to the following reasons:
  - Gradle detected a problem with the following location: 'D:\project\rnSafeBox\android\app\build\intermediates\merged_jni_libs\release\out'. Reason: Task ':app:mergeReleaseNativeLibs' uses this output of task ':app:copyReleaseBundledJs' without declaring an explicit or implicit dependency. This can lead to incorrect results being produced, depending on wha
> Task :react-native-picker:verifyReleaseResources FAILED

```

### Reanimated


```
error: node_modules/react-native-reanimated/src/index.ts: /Users/tomekzaw/RNOS/Issue3397/node_modules/react-native-reanimated/src/index.ts: Export namespace should be first transformed by `@babel/plugin-proposal-export-namespace-from`.
  5 | export * from './reanimated1';
  6 | export * from './reanimated2';
> 7 | export * as default from './Animated';
    |        ^^^^^^^^^^^^
```



    Add Reanimated's babel plugin to your babel.config.js:

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
+  plugins: ['react-native-reanimated/plugin'],
};




    Clear application cache (depending on your workflow or favourite package manager):

    yarn start --reset-cache
    OR: npm start -- --reset-cache
    OR: expo start -c



参考：

https://github.com/software-mansion/react-native-reanimated/issues/3410






### FingerprintScanner



```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkDebugAarMetadata'.
> Could not resolve all files for configuration ':app:debugRuntimeClasspath'.
   > Could not find com.wei.android.lib:fingerprintidentify:1.2.6.
     Required by:
         project :app > project :react-native-fingerprint-scanner

```



build.gradle新增jcenter()



```
allprojects {
    repositories {
        ....
        jcenter()
    }
}
```



参考：https://github.com/hieuvp/react-native-fingerprint-scanner/issues/192




