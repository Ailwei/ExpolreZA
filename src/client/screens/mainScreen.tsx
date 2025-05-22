import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import Header from '../component/header';
import ActivityTypes from '../component/ActvityTypes';
import Nearby from '../component/nearByCard';
import HikingCard from '../component/HikingCard';
import CampingCard from '../component/CampingCard';
import FishingCard from '../component/FishingCard';
import WaterFallCard from '../component/WaterFalls';
import PassesCard from '../component/Passes';

const { height, width } = Dimensions.get('window');

const MainScreen = () => {
  const [selectedType, setSelectedType] = useState("NearBy");

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <View>
        <ActivityTypes selectedtype={selectedType} onSelectType={setSelectedType} />
      </View>

     
        {/* Header Section */}


        {/* Content Section */}
        <View style={styles.content}>
          {selectedType === "NearBy" && <Nearby />}
          {selectedType === "Hiking" && <HikingCard />}
          {selectedType === "Camping" && <CampingCard />}
          {selectedType === "Fishing" && <FishingCard />}
          {selectedType === "Passes" && <PassesCard />}
          {selectedType === "WaterFalls" && <WaterFallCard />}

        </View>

    </SafeAreaView>
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
    height: height,
    width: width,
  },
});

export default MainScreen;