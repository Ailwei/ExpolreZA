import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import ActivityCard from "../component/activityCard";

interface CompletedProps {
  favourites?: any[];
}

const Completed: React.FC<CompletedProps> = ({ favourites = [] }) => {
  const [completedList, setCompletedList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        const decoded: any = jwtDecode(token);
        setUserId(decoded.id);

        const res = await axios.post(
          "http://192.168.18.29:3000/api/fetchcompleted",
          { userId: decoded.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCompletedList(res.data.data);
      } catch (err) {
        console.error("Error fetching completed activities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompleted();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {completedList.map((activity) => (
        <ActivityCard
          key={activity.id}
          item={activity}
          favourites={favourites}
          userId={userId}
          onFavouritesChanged={() => {}}
        />
      ))}
    </View>
  );
};

export default Completed;
