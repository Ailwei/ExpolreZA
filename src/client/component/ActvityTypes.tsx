import React, { useState } from 'react'
import { View, Text, Dimensions, FlatList, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
const FontAwesome5 = require('react-native-vector-icons/FontAwesome5').default;


const { width, height } = Dimensions.get("window")
const iconSize = Math.round(width * 0.07);


type ActivityTypesProps = {
    selectedtype: string;
    onSelectType: (type: string) => void;
}

const ActivityTypes: React.FC<ActivityTypesProps> = ({ selectedtype, onSelectType }) => {

    return (

        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollContainer}>
            <TouchableOpacity
                style={[styles.item,
                selectedtype === "NearBy" ? { backgroundColor: "#F5F6F5" } : { backgroundColor: "#fff" }
                ]}
                onPress={() => onSelectType("NearBy")}

            >
                <View style={styles.icon}>
                    <FontAwesome5 name="map-marker-alt" size={iconSize} color="back" />
                    <Text style={styles.text}>
                        Nearby
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.item, selectedtype === "Hiking" ? { backgroundColor: "#F5F6F5" } : { backgroundColor: "#fff" }]}
                onPress={() => onSelectType("Hiking")}
            >
                <View style={styles.icon}>
                    <FontAwesome5 name="map" size={iconSize} color="black" />
                    <Text style={styles.text}>Hiking</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.item,
                selectedtype === "Camping" ? { backgroundColor: "#F5F5F5" } : { backgroundColor: "#fff" }
                ]}
                onPress={() => onSelectType("Camping")}
            >
                <View style={styles.icon} >
                    <FontAwesome5 name="tree" size={iconSize} color="black" />
                    <Text style={styles.text}>
                        Camping
                    </Text>
                </View>

            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.item,
                    selectedtype === "Fishing" ? { backgroundColor: "#F5F5F5" } : { backgroundColor: "#fff" }
                ]}
                onPress={() => onSelectType("Fishing")}
            >
                <View style={styles.icon}>
                    <FontAwesome5 name="anchor" size={iconSize} color="black" />
                    <Text style={styles.text}>Fishing</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.item,
                selectedtype === "Passes" ? { backgroundColor: "#F5F5F5" } : { backgroundColor: "#fff" }
                ]}
                onPress={() => onSelectType("Passes")}
            >
                <View style={styles.icon}>
                    <FontAwesome5 name="car" size={iconSize} color="black" />

                    <Text style={styles.text}>
                        Passes
                    </Text>
                </View>

            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.item,
                selectedtype === "WaterFalls" ? { backgroundColor: "#F5F5F5" } : { backgroundColor: "#fff" }
                ]}
                onPress={() => onSelectType("WaterFalls")}
            >
                <View style={styles.icon}>
                    <FontAwesome5 name="camera" size={iconSize} color="black" />

                    <Text style={styles.text}>
                        WaterFalls
                    </Text>
                </View>

            </TouchableOpacity>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    scrollContainer: {
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10,

    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        padding: 15,
        width: width * 0.3,
        height: height * 0.09,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    icon: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    text: {
        fontSize: 15,
        fontWeight: '600',
        color: "#333",
        textAlign: 'left',
        paddingLeft: 10,

    },
})
export default ActivityTypes