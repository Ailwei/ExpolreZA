import React from "react";
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from "react-native";


const { width, height } = Dimensions.get("window");
const PassesCard = () => {
    return (
        <View>
            <Text>Passes  card</Text>
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
});
export default PassesCard;