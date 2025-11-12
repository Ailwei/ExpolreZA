import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/RootStackParamList";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native";
import FavouritesModal from "./FavouriteModal";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
const FontAwesome5 = require('react-native-vector-icons/FontAwesome5').default;

const { width, height } = Dimensions.get("window");

export interface ActivityCardProps {
    item: any;
    favourites: any[];
    userId: string | null;
    onFavouritesChanged: () => void;

}
type ActivityCardNavigationProp = StackNavigationProp<RootStackParamList, 'ActivityDetails'>;


const ActivityCard: React.FC<ActivityCardProps> = ({ item, favourites, userId, onFavouritesChanged }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<ActivityCardNavigationProp>();
    const iconSize = 20;

    const isFavourited = favourites.some(
        fav =>
            fav.activityId === item.id ||
            (fav.activity && fav.activity.id === item.id)
    );


    const handleToggleFavourite = async (e: any) => {
        e.stopPropagation();
        if (!userId) return;

        const token = await AsyncStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        if (isFavourited) {
            await axios.post("http://192.168.18.29:3000/api/removeFavourites", {
                listId: (favourites.find(
                    fav => fav.activityId === item.id || (fav.activity && fav.activity.id === item.id)
                )?.listId),
                activityId: item.id,
            }, config);
            onFavouritesChanged();
            Alert.alert('Success', 'Activity removed from favourites!');
        } else {
            setModalVisible(true);
        }
    };

    const handleAddToList = async (listId: string) => {
        const token = await AsyncStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        await axios.post("http://192.168.18.29:3000/api/saveFavourites", {
            listId,
            activityId: item.id,
        }, config);
        setModalVisible(false);
        Alert.alert('Success', 'Activity added to favourites!');
        onFavouritesChanged();
    };

    const handleCardPress = () => {

        navigation.navigate("ActivityDetails", { activity: item, isFavourited });
        console.log("Item data:", item.data);

    };

    return (
        <TouchableOpacity onPress={handleCardPress} activeOpacity={0.8}>
            <View style={styles.card}>
                <TouchableOpacity
                    style={styles.favouriteIcon}
                    onPress={handleToggleFavourite}
                    activeOpacity={0.7}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <FontAwesome5 name="bookmark" size={iconSize} color={isFavourited ? "green" : "black"} />
                </TouchableOpacity>
                <FavouritesModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSelectList={handleAddToList}
                    onListCreated={onFavouritesChanged}
                />
                <View style={styles.details}>
                    <View style={{ width: "100%", height: 180, backgroundColor: "#eee", borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: "hidden" }}>
                        {item.data.tags?.imageUrl && (
                            <Image
                                source={{ uri: item.data.tags?.imageUrl }}
                                style={{ width: "100%", height: "100%", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                                resizeMode="cover"
                                onError={() => console.error("Failed to load image from:", item.data.tags.imageUrl)}
                            />
                        )}
                    </View>

                  <View>
  <Text style={styles.location}>
    {item.data.name || item.data.tags?.name || "Unnamed Place"}
  </Text>

  {item.data.tags?.distance && (
    <Text style={styles.info}>Distance: {item.data.tags.distance}</Text>
  )}
  {item.data.category && (
    <Text style={styles.info}>Category: {item.data.category}</Text>
  )}

  {item.data.tags?.access && (
    <Text style={styles.info}>Access: {item.data.tags.access}</Text>
  )}
  {item.data.tags?.roundtrip && (
        <Text style={styles.info}>Round Trip: {item.data.tags.roundtrip}</Text>
  )}

  {item.data.tags?.rating && (
    <Text style={styles.info}>Rating: {item.data.tags.rating}</Text>
  )}
   {item.data.tags?.horse && (
    <Text style={styles.info}>Horse: {item.data.tags.horse}</Text>
  )}
{item.data.tags?.bicycle && (
    <Text style={styles.info}>Bicycle: {item.data.tags.bicycle}</Text>
  )}
  {item.data.tags?.moto_vehicle && (
    <Text style={styles.info}>Moto Vehicle: {item.data.tags.moto_vehicle}</Text>
  )}
  {item.data.tags?.smoothness && (
    <Text style={styles.info}>Smoothness: {item.data.tags.smoothness}</Text>
  )}
   {item.data.tags?.surface && (
    <Text style={styles.info}>Surface: {item.data.tags.surface}</Text>
  )}
   {item.data.tags?.bridge && (
    <Text style={styles.info}>Bridge: {item.data.tags.bridge}</Text>
  )}
   {item.data.tags?.informal && (
    <Text style={styles.info}>Informal: {item.data.tags.informal}</Text>
  )}
   {item.data.tags?.maxspeed && (
    <Text style={styles.info}>Max speed: {item.data.tags.maxspeed}</Text>
  )}
  {item.data.tags?.dog && (
    <Text style={styles.info}>Dog: {item.data.tags.dog}</Text>
  )}
  
  


  {item.data.tags?.user_ratings_total && (
    <Text style={styles.info}>
      Total Ratings: {item.data.tags.user_ratings_total}
    </Text>
  )}
</View>

                </View>
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: width * 0.9,
        alignSelf: "center",
        height: height * 0.4,
        position: "relative",
    },
    details: {
        height: height * 0.9,
        padding: 0,
        bottom: 30,
    },
    location: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
        marginTop: 30,
        paddingLeft: 10

    },
    info: {
        fontSize: 14,
        color: "#555",
        marginBottom: 3,
        paddingLeft: 10
    },
    favouriteIcon: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 5,
        zIndex: 10,
        width: width * 0.1,
        height: width * 0.1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default ActivityCard;