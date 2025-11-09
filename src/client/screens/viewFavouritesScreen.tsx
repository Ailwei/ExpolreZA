import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const FontAwesome5 = require("react-native-vector-icons/FontAwesome5").default;

const ViewFavouritesScreen: React.FC = () => {
  const route = useRoute();
  const { favourites = [] } = route.params as { favourites: any[] };
  const [favouritesList, setFavouritesList] = useState(favourites);

  const removeFavourites = async (listId: number, activityId: number) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.post(
        "http://192.168.18.29:3000/api/removeFavourites",
        { listId, activityId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Favourite deleted");
        setFavouritesList((prev) =>
          prev.filter(
            (item) =>
              !(item.listId === listId && item.activityId === activityId)
          )
        );
      } else {
        Alert.alert("Error", "Failed to delete favourite");
      }
    } catch (err: any) {
      console.error(
        "Failed to remove favourite:",
        err.response?.data || err.message
      );
      Alert.alert("Error", "An error occurred while deleting favourite");
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    const locationName =
      item.activity?.data?.locationName ||
      item.data?.name ||
      "Unnamed Activity";

    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{locationName}</Text>
        <View style={styles.deleteIcon}>
          <TouchableOpacity
            onPress={() => removeFavourites(item.listId, item.activityId)}
          >
            <FontAwesome5 name="trash" size={16} color="grey" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {favouritesList.length === 0 ? (
        <Text style={styles.emptyText}>No favourites found.</Text>
      ) : (
        <FlatList
          data={favouritesList}
          keyExtractor={(item, idx) =>
            item.id?.toString() || idx.toString()
          }
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    position: "relative",
  },
  itemText: { fontSize: 16 },
  deleteIcon: { position: "absolute", right: 10, top: 10 },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});

export default ViewFavouritesScreen;