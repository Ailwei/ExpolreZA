import React from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import Header from '../component/header';
import ActivityTypes from '../component/ActvityTypes';
import { ScrollView } from 'react-native-gesture-handler';
import CampingCard from '../component/CampingCard';

const { height, width } = Dimensions.get('window');

const MainScreen = () => {
  
  return (
    <ScrollView>
    <SafeAreaView style={styles.safeArea}>
      {/* Header Section */}
      <Header />
<View>
  <ActivityTypes/>
</View>
      {/* Content Section */}
      <View style={styles.content}>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainScreen;