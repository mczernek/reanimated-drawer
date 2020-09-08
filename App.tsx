/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, StyleSheet, StatusBar, Text, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withDecay,
  withTiming,
} from 'react-native-reanimated';

const drawerWidth = 250;

const velocityThreshold = 1;
const openingThreshold = drawerWidth / 2;

const drawerGestureAreaWidth = 18;

const App = () => {
  const translate = useSharedValue(0 as number);
  const drawerShown = useSharedValue(false);

  const drawerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translate.value,
        },
      ],
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translate.value,
        },
      ],
    };
  });

  const onPan = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.startX = translate.value;
    },
    onActive: (event, context) => {
      let translation = context.startX + event.translationX;
      if (translation < 0) translation = 0;
      if (translation > drawerWidth) translation = drawerWidth;
      translate.value = translation;
    },
    onEnd: (event, context) => {
      let translation = context.startX + event.translationX;
      if (
        event.velocityX > velocityThreshold ||
        (event.velocityX > -velocityThreshold && translation > openingThreshold)
      ) {
        drawerShown.value = true;
        translate.value = withTiming(drawerWidth);
      } else {
        drawerShown.value = false;
        translate.value = withTiming(0);
      }
    },
  });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaProvider style={styles.constainer}>
        <Animated.View style={styles.contentContainer}>
          <Animated.View style={[styles.movingContentConteiner, contentStyle]}>
            <SafeAreaView style={styles.entriesColumnContainer}>
              <View style={styles.entriesColumn}>
                <FlatList
                  style={{ width: '100%' }}
                  data={items}
                  keyExtractor={(item, index) => `${index}`}
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
            </SafeAreaView>
            <SafeAreaView style={styles.contentColumnContainer}>
              <View style={styles.contentColumn}>
                <Text>Content column</Text>
              </View>
            </SafeAreaView>
          </Animated.View>
          <PanGestureHandler onGestureEvent={onPan}>
            <Animated.View
              style={{
                position: 'absolute',
                height: '100%',
                width: drawerGestureAreaWidth,
              }}
            />
          </PanGestureHandler>
          <Animated.View style={[styles.drawerColumnContainer, drawerStyle]}>
            <SafeAreaView style={{ flex: 1 }}>
              <PanGestureHandler onGestureEvent={onPan}>
                <Animated.View style={styles.drawerColumn}>
                  <Text>Drawer column</Text>
                </Animated.View>
              </PanGestureHandler>
            </SafeAreaView>
          </Animated.View>
        </Animated.View>
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
  'Ten',
];
const styles = StyleSheet.create({
  constainer: {},
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
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  drawerColumnContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    start: -drawerWidth,
    backgroundColor: '#ffeecc',
    width: drawerWidth,
  },
  drawerColumn: {
    backgroundColor: '#ffeecc',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
