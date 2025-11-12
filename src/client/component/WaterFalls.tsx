import React, {useEffect, useState} from "react";
import { View, Text, Dimensions,ActivityIndicator, FlatList, TouchableOpacity, StyleSheet } from "react-native";

import { jwtDecode } from "jwt-decode";
// @ts-ignore
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActivityCard from "./activityCard";
import { getCurrentLocation } from "../utils/location";
import axios from "axios";

const { width, height } = Dimensions.get("window");
type Activity = {
     id: string;
    data: any;
}
const WaterFallCard : React.FC = () => {
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
        "http://192.168.18.29:3000/api/fetchWaterFalls",
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
            {activities.length > 0 ? (

                <>
                <Text style={styles.info}>WaterFalls NearBy</Text>

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
                </>
            ) : (
            <Text style={styles.info}>No waterfalls activities found nearby.</Text>    
            )}
            
        </View>
    );
}
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
    },
    image: {
        width: "100%",
        height: 150,
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
     loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
export default WaterFallCard;