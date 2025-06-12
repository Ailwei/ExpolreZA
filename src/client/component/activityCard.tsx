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
                        {item.data.imageUrl ? (
                            <Image
                                source={{uri: item.data.imageUrl}}
                                style={{ width: "100%", height: "100%", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                                resizeMode="cover"
                            />
                        ) : (
                            <Image
                                source={require('../assets/trail1.jpeg')}
                                style={{ width:  "100%", height: "100%", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                                resizeMode="cover"
                            />
                        )}
                    </View>
                   <Text style={styles.location}>
  Location: {item.data.locationName 
    || item.data.formatted_address 
    || (item.data.tags && item.data.tags.name) 
    || "Unnamed Trail"}
</Text>
<Text style={styles.info}>
  {item.data.rating 
    || (item.data.tags && item.data.tags.stars) 
    || "N/A"}
</Text>
<Text style={styles.info}>
  {item.data.types
    ? item.data.types.join(", ")
    : (item.data.tags && Object.values(item.data.tags).join(", "))
    || "N/A"}
</Text>
<Text style={styles.info}>
  {item.data.opening_hours
    ? (
      <Text style={{ color: item.data.opening_hours.open_now ? "green" : "red", fontWeight: "bold" }}>
        {item.data.opening_hours.open_now ? "Open Now" : "Closed"}
      </Text>
    )
    : "N/A"}
   
</Text>
<Text style={styles.info}>
  {item.data.tags?.city 
    || item.data.tags?.["addr:city"] 
    || item.data.tags?.["addr:town"] 
    || item.data.tags?.["addr:village"] 
    || item.data.tags?.["addr:place"] 
    || "Unknown City"}
</Text>
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
        height: height * 0.5,
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
        marginBottom: 5,
        marginTop: 30,
    },
    info: {
        fontSize: 14,
        color: "#555",
        marginBottom: 3,
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