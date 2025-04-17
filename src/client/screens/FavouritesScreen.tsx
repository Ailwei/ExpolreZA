import React from "react";
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { RootStackParamList } from "../types/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get('window');

const FavouritesScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return (
        <ScrollView>
            <View style={styles.Container}>
                <TouchableOpacity
                   onPress={() => navigation.navigate('MainStack', { screen: 'CreateFavouritesScreen' })}
                >
                    <Icon name="plus" size={50} color="white" style={styles.icon} />
                    <Text style={styles.title}>
                        Create New Favorites
                    </Text>
                </TouchableOpacity>

            </View>
            <View style={styles.Container}>
                <TouchableOpacity
                >

                    <Text style={styles.favouriteTitle}>
                        Maps
                    </Text>
                    <Icon name="map" size={50} color="green" style={styles.icon} />

                    <Text style={styles.subTitle}>0 Maps</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.Container}>
                <TouchableOpacity
                >
                    <Text style={styles.favouriteTitle}>
                        WaterFalls
                    </Text>
                    <Icon name="camera" size={50} color="black" style={styles.icon} />

                    <Text style={styles.subTitle}>0 WaterFalls</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    )


}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: '#fff',
        paddingLeft: 10,
        borderBottomWidth: 2,
        borderBottomColor: "grey",
    },
    title: {
        position: "absolute",
        fontSize: 30,
        marginTop: 25,
        marginLeft: 80,
    },
    favouriteTitle: {
        position: "absolute",
        fontSize: 30,
        marginBottom: 20,
        marginTop: 25,
        marginLeft: 80,


    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'semibold',
        marginBottom: 0,
        marginLeft: 80,

    },
    icon: {
        margin: 10,
        backgroundColor: "grey",
        borderWidth: 0.5,
        width: width * 0.13,
        height: height * 0.05,
        borderRadius: 5,
        marginTop: 30,
    }
})
export default FavouritesScreen
