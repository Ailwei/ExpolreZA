import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActivityCard from "./activityCard";

const { width, height } = Dimensions.get("window");

type Activity = {
    id: string;
    data: any;
};

const Nearby = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [favourites, setFavourites] = useState<any[]>([]);

    const fetchFavourites = async (uid: string) => {
        const res = await axios.post("http://192.168.18.29:3000/api/fetchFavourites", {
            userId: uid,
            
        });
        setFavourites(res.data.favourites || []);
    };

    useEffect(() => {
        const fetchUserIdAndFavourites = async () => {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                const decoded: any = jwtDecode(token as string);
                setUserId(decoded.id);
                await fetchFavourites(decoded.id);
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
                renderItem={({ item }) => (
                    <ActivityCard
                        item={item}
                        favourites={favourites}
                        userId={userId}
                        onFavouritesChanged={() => userId && fetchFavourites(userId)}
                    />
                )}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    info: {
        fontSize: 14,
        color: "#555",
        margin: 10,
    },
});

export default Nearby;