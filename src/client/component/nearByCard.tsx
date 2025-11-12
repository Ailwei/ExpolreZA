import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions, ActivityIndicator } from "react-native";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
// @ts-ignore
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActivityCard from "./activityCard";
import { getCurrentLocation } from "../utils/location";

const { width, height } = Dimensions.get("window");

type Activity = {
    id: string;
    data: any;
};

const Nearby = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [favourites, setFavourites] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchFavourites = async () => {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            const res = await axios.post("http://192.168.18.29:3000/api/fetchFavourites", {}, config);
            setFavourites(res.data.favourites || []);
        } catch (err) {
            console.error("Error fetching favourites:", err);
        }
    };

    useEffect(() => {
        const fetchUserIdAndFavourites = async () => {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                const decoded: any = jwtDecode(token as string);
                setUserId(decoded.id);
                await fetchFavourites();
            }
        };
        fetchUserIdAndFavourites();
    }, []);

    useEffect(() => {
  const fetchNearbyActivities = async () => {
    setLoading(true);
    try {
      const location = await getCurrentLocation();
      if (!location) {
        console.warn("Current location is unavailable.");
        setLoading(false);
        return;
      }

      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      const radius = 60000;

      const token = await AsyncStorage.getItem("token");
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

      const res = await axios.post(
        "http://192.168.18.29:3000/api/fetchNearby",
        { latitude, longitude, radius },
        config
      );

      setActivities(res.data.activities || res.data || []);
    } catch (err) {
      console.error("Error fetching nearby activities:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchNearbyActivities();
}, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" />
                <Text>Loading nearby activities...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.info}>Nearby Activities</Text>

            <FlatList
                data={activities}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ActivityCard
                        item={item}
                        favourites={favourites}
                        userId={userId}
                        onFavouritesChanged={() => userId && fetchFavourites()}
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
        fontWeight: "bold",
        color: "#333",
        margin: 10,
        justifyContent: "center"
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Nearby;
