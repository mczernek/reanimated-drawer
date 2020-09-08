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

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaProvider style={styles.constainer}>
        <SafeAreaView style={styles.drawerColumnContainer}>
          <View style={styles.drawerColumn}>
            <Text>Drawer column</Text>
          </View>
        </SafeAreaView>
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
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  constainer: {
    backgroundColor: '#ccaadd',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  drawerColumnContainer: {
    flex: 2,
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
