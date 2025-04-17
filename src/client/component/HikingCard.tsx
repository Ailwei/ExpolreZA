import React from "react";
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, Image } from "react-native";

const { width } = Dimensions.get("window");

interface HikingCardProps {
    image: string;
    distance: string;
    difficulty: string;
    location: string;
    estimatedTime: string;
}

const HikingCard: React.FC<HikingCardProps> = ({ image, distance, difficulty, location, estimatedTime }) => {
    return (
        <TouchableOpacity style={styles.card}>
            {/* Hiking Image */}
            <Image source={{ uri: image }} style={styles.image} />

            {/* Hiking Details */}
            <View style={styles.details}>
                <Text style={styles.location}>{location}</Text>
                <Text style={styles.info}>Distance: {distance}</Text>
                <Text style={styles.info}>Difficulty: {difficulty}</Text>
                <Text style={styles.info}>Estimated Time: {estimatedTime}</Text>
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
});

export default HikingCard;