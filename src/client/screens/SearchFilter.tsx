import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { height, width } = Dimensions.get('window');

const SearchFilterScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState("Best Combination");
  const [distance, setDistance] = useState(80);
  const [selecteRating, setSelectedRating] = useState(4.5);
  const [selectedActivity, setSelectedActivity] = useState("Hiking");
  const [selectedDificulty, setSelectedDificulty] = useState("Easy");
  const [selectedRouteType, setSelectedRouteType] = useState("Circular");

  const routeTypes = ["Circular", "Round Trip", "Ponint to Point"];
  const filters = ["Best Match", "Popular", "Nearby"];
  const activities = ["Hiking", "Fishing", "Camping", "Waterfalls"];
  const dificultyLevels = ["Easy", "Medium", "Hard"];
  
  const clearFilter = () => {
  setSelectedFilter("Best Combination");
  setDistance(80);
  setSelectedRating(4.5);
  setSelectedActivity("Hiking");
  setSelectedDificulty("Easy");
  setSelectedRouteType("Circular");
};

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>


      <ScrollView contentContainerStyle={{ paddingBottom: height * 0.2 }}>
        <View style={styles.container}>
          {/* Sort Section */}
          <Text style={styles.Title}>Sort</Text>
          <View style={styles.subTitleContainer}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterOption,
                  selectedFilter === filter
                    ? { backgroundColor: "#F5F6F5" }
                    : { backgroundColor: "#fff" },
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={styles.filterText}>{filter}</Text>
                <View
                  style={[
                    styles.radioButton,
                    selectedFilter === filter && styles.radioButtonSelected,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Distance Selector Section */}
        <View style={styles.container}>
          <Text style={styles.Title}>Distance</Text>
          <Text style={styles.filterText}>
            See activities within{" "}
            {distance === 80 ? "Any Distance" : `${distance} km`} from your current location
          </Text>
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>0 KM</Text>
            <Text style={styles.sliderLabel}>
              {distance === 80 ? "Any Distance" : `${distance} KM`}
            </Text>
          </View>
          <Slider
            style={styles.silder}
            minimumValue={0}
            maximumValue={80}
            step={1}
            value={distance}
            onSlidingComplete={(value) => setDistance(value)}
            minimumTrackTintColor="blue"
            maximumTrackTintColor="#ccc"
            thumbTintColor="blue"
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.Title}>Activity</Text>
          {activities.map((activity) => (
            <TouchableOpacity
              key={activity}
              style={[
                styles.filterOption,
                selectedActivity === activity
                  ? { backgroundColor: "#F5F6F5" }
                  : { backgroundColor: "#fff" },
              ]}
              onPress={() => setSelectedActivity(activity)}
            >
              <Text style={styles.filterText}>{activity}</Text>
              <View
                style={[
                  styles.radioButton,
                  selectedActivity === activity && styles.radioButtonSelected,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.container}>
          <Text style={styles.Title}>Difficulity</Text>
          {dificultyLevels.map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.filterOption,
                selectedDificulty === level
                  ? { backgroundColor: "#F5F6F5" }
                  : { backgroundColor: "#fff" },
              ]}
              onPress={() => setSelectedDificulty(level)}
            >
              <Text style={styles.filterText}>{level}</Text>
              <View
                style={[
                  styles.radioButton,
                  selectedDificulty === level && styles.radioButtonSelected,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.container}>
          <Text style={styles.Title}>Route Type</Text>
          {routeTypes.map((route) => (
            <TouchableOpacity
              key={route}
              style={[styles.filterOption, selectedRouteType === route ? { backgroundColor: "#F5F6F5" } : { backgroundColor: "#fff" }]}
              onPress={() => setSelectedRouteType(route)}
            >
              <Text style={styles.filterText}>{route}</Text>
              <View style={[styles.radioButton, selectedRouteType === route && styles.radioButtonSelected]} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.container}>
          <Text style={styles.Title}>Rating</Text>
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabels}>
              {selecteRating === 0 ? "Any" : `${selecteRating.toFixed(1)} +`}
            </Text>
          </View>
          <Slider
            minimumValue={0}
            maximumValue={4.5}
            step={0.1}
            value={selecteRating}
            onSlidingComplete={(value) => {
              if (value < 1.5) {
                setSelectedRating(0);
              }
              else if (value >= 1.5 && value < 2.5) {
                setSelectedRating(2.5);
              } else if (value >= 1.5 && value < 4.0) {
                setSelectedRating(3.5);
              } else {
                setSelectedRating(4.5);
              }
            }}
          />

          <View style={styles.predefinedRating}>
            <View style={styles.ratingItem}>
              <Text style={styles.sliderLabel}>0+</Text>
            </View>
            <View style={styles.ratingItem}>
              <Text style={styles.sliderLabel}>3.5</Text>

              <Icon name="star" size={20} color="blue" />
            </View>
            <View style={styles.ratingItem}>
              <Text style={styles.sliderLabel}>4.0</Text>
              <Icon name="star" size={20} color="blue" />

            </View>
            <View style={styles.ratingItem}>
              <Text style={styles.sliderLabel}>4.5</Text>
              <Icon name="star" size={20} color="blue" />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.filterButtonContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => clearFilter()}
        >
          < Text style={styles.filterButtonText}>
            Clear Filters
          </Text>


        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => console.log("Apply Filters")}
        >
          <Text style={styles.filterButtonText}>
            Apply filter
          </Text>


        </TouchableOpacity>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  subTitleContainer: {
    marginTop: 20,
  },
  Title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  filterText: {
    fontSize: 20,
    color: '#333',
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    backgroundColor: 'grey',
    borderColor: '#000',
  },
  silder: {
    width: width * 0.9,
    height: 40,
    alignSelf: 'center',
    marginTop: 10,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selecteRaiting: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
    marginLeft: 20,
  },
  predefinedRating: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
    marginLeft: 10,
  },
  ratingItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
  },
  filterButton: {
    justifyContent: 'center',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: width * 0.4,
    height: height * 0.05,
    margin: 15,
  },
  filterButtonText: {
    fontSize: 15,
    color: '#fff',
  },
  filterButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: height * 0.1,
    width: width,
    position: 'absolute',
    bottom: 0,
    backgroundColor: "grey",
    marginBottom: 1,
  }
});

export default SearchFilterScreen;