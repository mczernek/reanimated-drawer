/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';
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

const App = () => {
  const translateDrawer = useSharedValue(0 as number);
  const translateContent = useSharedValue(0 as number);

  const drawerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateDrawer.value,
        },
      ],
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateContent.value,
        },
      ],
    };
  });

  const springConfig = {
    damping: 7,
    mass: 1,
    stiffness: 121.6,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  };

  const onPan = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.startX = translateDrawer.value;
    },
    onActive: (event, context) => {
      let translation = context.startX + event.translationX;
      if (translation < 0) translation = 0;
      if (translation > drawerWidth) translation = drawerWidth;
      translateDrawer.value = translation;
      translateContent.value = translation;
    },
    onEnd: (event, context) => {
      let translation = context.startX + event.translationX;
      if (
        event.velocityX > velocityThreshold ||
        (event.velocityX > -velocityThreshold && translation > openingThreshold)
      ) {
        translateDrawer.value = withTiming(drawerWidth);
        translateContent.value = withTiming(drawerWidth);
      } else {
        translateDrawer.value = withTiming(0);
        translateContent.value = withTiming(0);
      }
    },
  });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaProvider style={styles.constainer}>
        <PanGestureHandler onGestureEvent={onPan}>
          <Animated.View style={styles.contentContainer}>
            <Animated.View style={[styles.movingContentConteiner, contentStyle]}>
              <SafeAreaView style={styles.entriesColumnContainer}>
                <View style={styles.entriesColumn}>
                  <Text>Entries column</Text>
                </View>
              </SafeAreaView>
              <SafeAreaView style={styles.contentColumnContainer}>
                <View style={styles.contentColumn}>
                  <Text>Content column</Text>
                </View>
              </SafeAreaView>
            </Animated.View>
            <Animated.View style={[styles.drawerColumnContainer, drawerStyle]}>
              <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.drawerColumn}>
                  <Text>Drawer column</Text>
                </View>
              </SafeAreaView>
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </SafeAreaProvider>
    </>
  );
};

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
