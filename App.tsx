/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Button,
  NativeModules,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { PanGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { WebView } from 'react-native-webview';

const drawerWidth = 250;

const velocityThreshold = 1;
const openingThreshold = drawerWidth / 2;

const drawerGestureAreaWidth = 18;

const App = () => {
  const [inputShown, setInputShown] = useState(false);

  const showKeyboard = () => {
    console.log(NativeModules);
    if (Platform.OS === 'android') {
      NativeModules.FrontKeyboard.showKeyboard();
    }
  };

  let webViewRef: WebView | null;
  let listRef: FlatList | null;

  let Script1 = `
      document.getElementById("input").addEventListener("focus", function(received) {  
       var data = {
      type: "OnFocusEvent",
      message : "OnFocusEvent",
      received: received
     };
      window.ReactNativeWebView.postMessage(JSON.stringify({data}));
        });
        document.getElementById("input").focus();
      `;

  let Script2 = `document.activeElement.blur();`;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaProvider style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <Animated.View style={styles.contentContainer}>
            <SafeAreaView style={styles.entriesColumnContainer}>
              <View style={styles.entriesColumn}>
                <FlatList
                  style={{ width: '100%' }}
                  data={items}
                  keyExtractor={(_item, index) => `${index}`}
                  ref={(ref) => (listRef = ref)}
                  onScroll={() => {
                    webViewRef?.injectJavaScript(Script2);
                  }}
                  renderItem={(item) => (
                    <Text
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        height: 80,
                      }}>
                      {`${item.item}`}
                    </Text>
                  )}
                />
              </View>
              <View
                style={{
                  height: 150,
                }}>
                {inputShown && (
                  <>
                    <WebView
                      ref={(ref) => (webViewRef = ref)}
                      style={{ flex: 1 }}
                      source={{
                        html:
                          '</br><form > <input id="input" class="input" type="text"  placeholder="Input "/></form>',
                      }}
                      keyboardDisplayRequiresUserAction={false} //ios
                      injectedJavaScript={Script1}
                      automaticallyAdjustContentInsets={false}
                      allowFileAccessFromFileURLs={true}
                      scalesPageToFit={false}
                      mixedContentMode={'always'}
                      javaScriptEnabled={true}
                      startInLoadingState={true}
                      onMessage={(event) => {
                        console.log(event, 'Message received!');
                        showKeyboard();
                      }}
                      onLoad={() => {}}
                      onLoadEnd={() => {
                        if (Platform.OS === 'android') {
                          webViewRef?.requestFocus();
                        }
                      }}
                    />
                    <Button title={'Hide input'} onPress={() => setInputShown(false)} />
                    <Button
                      title={'Lose focus'}
                      onPress={() => webViewRef?.injectJavaScript(Script2)}
                    />
                  </>
                )}
                {!inputShown && (
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: 'red',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Button title={'Show input'} onPress={() => setInputShown(true)} />
                  </View>
                )}
              </View>
            </SafeAreaView>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </>
  );
};

const items = [
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'And again',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Once more',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Last',
];
const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    backgroundColor: '#ccaadd',
    flex: 1,
  },
  movingContentConteiner: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    start: 0,
    end: 0,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  entriesColumnContainer: {
    flex: 2,
  },
  contentColumnContainer: {
    flex: 3,
  },
  entriesColumn: {
    backgroundColor: '#cceeff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentColumn: {
    backgroundColor: '#cceecc',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
