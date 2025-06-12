import React from "react";
import Config from 'react-native-config';
import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from "react-native";
const FontAwesome5 = require('react-native-vector-icons/FontAwesome5').default;
import MapboxGL from "@rnmapbox/maps";

const { width, height } = Dimensions.get('window');

MapboxGL.setAccessToken("pk.eyJ1IjoiYWlsd2VpIiwiYSI6ImNtYnNicG53YzBnMHYyanF0ZnVtNThjcGgifQ.mhUpVTBLKoo7fiGuBtMH3Q");

const ActivityDetails = () => {
  const route = useRoute();
  const { activity } = route.params as { activity: any };
  console.log("Activity data:", activity.data);

  let lat: number | null = null;
  let lng: number | null = null;

  if (
    activity.data.geometry &&
    activity.data.geometry.location &&
    typeof activity.data.geometry.location.lat === "number" &&
    typeof activity.data.geometry.location.lng === "number"
  ) {
    lat = activity.data.geometry.location.lat;
    lng = activity.data.geometry.location.lng;
  }
  else if (
    activity.data.geometry &&
    Array.isArray(activity.data.geometry) &&
    activity.data.geometry.length > 0
  ) {
    lat = activity.data.geometry[0].lat;
    lng = activity.data.geometry[0].lon;
  }
  else if (
    typeof activity.data.lat === "number" &&
    typeof activity.data.lon === "number"
  ) {
    lat = activity.data.lat;
    lng = activity.data.lon;
  }

  return (
    <ScrollView style={styles.container}>
      {activity.data.imageUrl && (
        <Image
          source={{ uri: activity.data.imageUrl }}
          style={styles.trailImage}
          resizeMode="cover"
        />
      )}

      <Text style={styles.title}>
        <Text style={styles.value}>
          {activity.data.locationName ||
            activity.data.name ||
            (activity.data.tags && activity.data.tags.locationName) ||
            "Unnamed Trail"}
        </Text>
      </Text>

      <View style={styles.details}>
        <View>
          <Text>
            {activity.data.location ||
              activity.data.formatted_address ||
              (activity.data.tags && activity.data.tags.description) ||
              "OSM Trail"}
          </Text>
        </View>
        <FontAwesome5 name="star" size={16} color="gold" />
        <Text style={styles.label}>
          <Text style={styles.value}>
            {activity.data.rating ||
              (activity.data.tags && activity.data.tags.stars) ||
              "N/A"}{" "}
            ({activity.data.user_ratings_total || "N/A"})
          </Text>
          <Text
            style={[
              styles.value,
              {
                color: activity.data.opening_hours?.open_now ? "green" : "red",
                fontWeight: "bold",
                marginLeft: 8,
              },
            ]}
          >
            {activity.data.opening_hours
              ? activity.data.opening_hours.open_now
                ? " Open Now"
                : " Closed"
              : ""}
          </Text>
        </Text>
      </View>

      <Text>Trail length</Text>
      <Text>Elevation gain</Text>
      <Text>Description</Text>

      <View style={styles.screenShotMap}>
        {lat && lng ? (
          <MapboxGL.MapView style={{ flex: 1 }} scrollEnabled={false}>
            <MapboxGL.Camera
              zoomLevel={14}
              centerCoordinate={[lng, lat]}
            />
            <MapboxGL.PointAnnotation
              id="activity-location"
              coordinate={[lng, lat]}
            >
              <View />
            </MapboxGL.PointAnnotation>
          </MapboxGL.MapView>
        ) : (
          <Text>No location data available</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 20,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    color: "green",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    flexDirection: "row",
  },
  details: {
    flexDirection: "row",
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  value: {
    fontWeight: "normal",
  },
  screenShotMap: {
    height: height * 0.3,
    width: width * 0.9,
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  trailImage: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 18,
  },
});

export default ActivityDetails;