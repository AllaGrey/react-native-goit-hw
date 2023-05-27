// import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import RegistrationScreen from './Screens/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <RegistrationScreen /> */}
      <LoginScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
