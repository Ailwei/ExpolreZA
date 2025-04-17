import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import NaviagationStack from './navigation/NavigationStack';

export default function App() {
  return (
   
  <NavigationContainer>
    <NaviagationStack/>
  </NavigationContainer>
  );
}


