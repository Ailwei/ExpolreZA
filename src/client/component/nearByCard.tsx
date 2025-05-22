import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import FavouritesModal from "./FavouriteModal";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FontAwesome5 = require('react-native-vector-icons/FontAwesome5').default;

const { width, height } = Dimensions.get("window");

type Photo = {
    photo_reference?: string;
    height?: number;
    width?: number;
};

type Activity = {
    id: string;
    data: {
        name?: string;
        description?: string;
        locationKey?: string;
        locationName?: string;
        photos?: Photo[];
        types?: string[];
        rating?: number;
        user_ratings_total?: number;
        formatted_address?: string;
        place_id?: string;
    };
};

const ActivityCard = React.memo(({ item, favourites }: { item: Activity, favourites: any[] }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const iconSize = 20;
    const navigation = useNavigation<any>();

    const handleCardPress = () => {
        console.log("Card pressed:", item.id);
    };

    const handleFavouritePress = (e: any) => {
        e.stopPropagation();
        setModalVisible(true);
    };

    const handleAddToList = async (listId: string) => {
        await axios.post("http://192.168.18.29:3000/api/saveFavourites", {
            userId,
            listId,
            activityId: item.id,
        });
        console.log("Added to list:", listId, userId, item.id);
        setModalVisible(false);
    };

    useEffect(() => {
        const fetchUserId = async () => {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                const decoded: any = jwtDecode(token as string);
                setUserId(decoded.id);
            }
        };
        fetchUserId();
    }, []);


    const isFavourited = favourites.some(fav => fav.activityId === item.id);

    return (
        <TouchableOpacity onPress={handleCardPress} activeOpacity={0.8}>
            <View style={styles.card}>
                <TouchableOpacity
                    style={styles.favouriteIcon}
                    onPress={handleFavouritePress}
                    activeOpacity={0.7}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
            <FontAwesome5 name="bookmark" size={iconSize} color={isFavourited ? "green" : "black"} />
                </TouchableOpacity>
                <FavouritesModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSelectList={handleAddToList}
                />
                <View style={styles.details}>
                    <Text style={styles.location}>Location: {item.data.locationName || item.data.name}</Text>
                    <Text style={styles.info}>Description: {item.data.description}</Text>
                    <Text style={styles.info}>Location Name: {item.data.locationName}</Text>
                    <Text style={styles.info}>Types: {item.data.types?.join(", ")}</Text>
                    <Text style={styles.info}>User Rating Number: {item.data.user_ratings_total}</Text>
                    <Text style={styles.info}>User Rating Value: {item.data.rating}</Text>
                    <Text style={styles.info}>Formatted Address: {item.data.formatted_address}</Text>
                    {item.data.photos && Array.isArray(item.data.photos) && item.data.photos.length > 0 ? (
                        item.data.photos.map((photo: any, idx: number) => (
                            <View key={idx} style={{ marginBottom: 4 }}>
                                <Text style={styles.info}>Photo Reference: {photo.photo_reference}</Text>
                                <Text style={styles.info}>Photo Height: {photo.height}</Text>
                                <Text style={styles.info}>Photo Width: {photo.width}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.info}>Photos: None</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
});

const Nearby = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [favourites, setFavourites] = useState<any[]>([]);

useEffect(() => {
    const fetchUserIdAndFavourites = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            const decoded: any = jwtDecode(token as string);
            setUserId(decoded.id);
            const res = await axios.post("http://192.168.18.29:3000/api/fetchFavourites", {
                userId: decoded.id,
            });
            setFavourites(res.data.favourites || []);
        }
    };
    fetchUserIdAndFavourites();
}, []);

    useEffect(() => {
        const fetchNearby = async () => {
            const response = await axios.post("http://192.168.18.29:3000/api/fetchNearBy", {
                latitude: 36.27861159104959,
                longitude: -121.80934530017794
            });
            console.log("Nearby activities:", response.data.activities);
            setActivities(response.data.activities || []);
        };
        fetchNearby();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.info}>Nearby</Text>
            <FlatList
                data={activities}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ActivityCard item={item} favourites={favourites} />}                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
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

export default Nearby;