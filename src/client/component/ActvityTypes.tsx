import React, { useState } from 'react'
import { View, Text, Dimensions, FlatList, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const { width, height } = Dimensions.get("window")

const ActivityTypes = () => {
    const [selected, setSelected] = useState("NearBy")
    console.log(selected)
    return (

        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollContainer}>
            <TouchableOpacity
                style={[styles.item,
                selected === "NearBy" ? { backgroundColor: "#F5F6F5" } : { backgroundColor: "#fff" }
                ]}
                onPress={() => setSelected("NearBy")}

            >
                <View style={styles.icon}>
                    <Icon name="map-marker" size={30} color="black" />
                    <Text style={styles.text}>
                        Nearby
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.item}
            >
                <View style={styles.icon}>
                    <Icon name="map" size={30} color="black" />
                    <Text style={[styles.text,
                    selected === "Hiking" ? { backgroundColor: "#F5F5F5" } : { backgroundColor: "#fff" }
                    ]}
                        onPress={() => setSelected("Hiking")}
                    >
                        Hiking
                    </Text>
                </View>

            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.item,
                selected === "Camping" ? { backgroundColor: "#F5F5F5" } : { backgroundColor: "#fff" }
                ]}
                onPress={() => setSelected("Camping")}
            >
                <View style={styles.icon} >
                    <Icon name="tree" size={30} color="black" />
                    <Text style={styles.text}>
                        Camping
                    </Text>
                </View>

            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.item,
                selected === "Camping" ? { backgroundColor: "#F5F5F5" } : { backgroundColor: "#fff" }
                ]}
                onPress={() => setSelected("Camping")}
            >
                <View style={styles.icon}>
                    <Icon name="anchor" size={30} color="black" />
                    <Text style={[styles.text,
                    selected === "Fishing" ? { backgroundColor: "#F5F5F5" } : { backgroundColor: "#fff" }
                    ]}
                        onPress={() => setSelected("Fishing")}
                    >
                        Fishing
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.item,
                selected === "Passes" ? { backgroundColor: "#F5F5F5" } : { backgroundColor: "#fff" }
                ]}
                onPress={() => setSelected("Passes")}
            >
                <View style={styles.icon}>
                    <Icon name="car" size={30} color="black" />

                    <Text style={styles.text}>
                        Passes
                    </Text>
                </View>

            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.item,
                selected === "WaterFalls" ? { backgroundColor: "#F5F5F5" } : { backgroundColor: "#fff" }
                ]}
                onPress={() => setSelected("WaterFalls")}
            >
                <View style={styles.icon}>
                    <Icon name="camera" size={30} color="black" />

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
        width: width * 0.4,
        height: height * 0.1,
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