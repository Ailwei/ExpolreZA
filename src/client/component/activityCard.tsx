import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import FavouritesModal from "./FavouriteModal";
import axios from "axios";
const FontAwesome5 = require('react-native-vector-icons/FontAwesome5').default;

const { width, height } = Dimensions.get("window");

export interface ActivityCardProps {
    item: any;
    favourites: any[];
    userId: string | null;
    onFavouritesChanged: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ item, favourites, userId, onFavouritesChanged }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const iconSize = 20;

    const favourite = favourites.find(fav => fav.activityId === item.id);
    const isFavourited = !!favourite;

    const handleToggleFavourite = async (e: any) => {
        e.stopPropagation();
        if (!userId) return;

        if (isFavourited) {
            await axios.post("http://192.168.18.29:3000/api/removeFavourites", {
                listId: favourite.listId,
                activityId: item.id,
            });
            onFavouritesChanged();
        } else {
            setModalVisible(true);
        }
    };

    const handleAddToList = async (listId: string) => {
        await axios.post("http://192.168.18.29:3000/api/saveFavourites", {
            userId,
            listId,
            activityId: item.id,
        });
        setModalVisible(false);
        onFavouritesChanged();
    };

    const handleCardPress = () => {
        console.log("Card pressed:", item.id);
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
                    <Text style={styles.location}>Location: {item.data.locationName || item.data.name}</Text>
                    <Text style={styles.info}>Place_id: {item.data.place_id}</Text>
                    <Text style={styles.info}>Address: {item.data.formatted_address}</Text>
                    <Text style={styles.info}>Rating: {item.data.rating || "N/A"}</Text>
                    {Array.isArray(item.data.photos) && item.data.photos.length > 0 ? (
                        item.data.photos.map((photo: any, idx: number) => (
                            <Text style={styles.info} key={idx}>
                                Photo Reference: {photo.photo_reference}, Size: {photo.width}x{photo.height}
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.info}>Images: No image found</Text>
                    )}
                    <Text style={styles.info}>Types: {item.data.types ? item.data.types.join(", ") : "N/A"}</Text>
                    <Text style={styles.info}>Opening Hours: {item.data.opening_hours ? item.data.opening_hours.open_now ? "Open Now" : "Closed" : "N/A"}</Text>

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
        height: height * 0.3,
        position: "relative",
    },
    details: {
        padding: 10,
    },
    location: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
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
    }
});

export default ActivityCard;