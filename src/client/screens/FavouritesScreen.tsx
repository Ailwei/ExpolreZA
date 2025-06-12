import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Touchable } from 'react-native';
const FontAwesome5 = require('react-native-vector-icons/FontAwesome5').default;
import { RootStackParamList } from "../types/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get('window');

const iconSize = 40;
const deleteIconSize = 25;

interface FavouritesScreenProps {
    onSelectList?: (list: any) => void;
    isModal?: boolean;
    onListCreated?: (newListId: string) => void;

}
const FavouritesScreen: React.FC<FavouritesScreenProps> = ({ onSelectList, isModal, onListCreated }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [userId, setUserId] = useState<string | null>(null);
    const [lists, setLists] = useState<any[]>([]);
    const [favourites, setFavourites] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    


    const deleteList = async (listId: string) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        await axios.post("http://192.168.18.29:3000/api/deleteList", {
            listId,
        }, config);
        console.log("List deleted successfully:", listId);
        if (userId) await fetchListsAndFavourites();
    } catch (error) {
        console.error("Error deleting list:", error);
    }
};
    const fetchListsAndFavourites = async () => {
    setLoading(true);
    try {
        const token = await AsyncStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const [listsRes, favsRes] = await Promise.all([
            axios.post("http://192.168.18.29:3000/api/fetchLists", {}, config),
            axios.post("http://192.168.18.29:3000/api/fetchFavourites", {}, config)
        ]);
        setLists(listsRes.data.lists);
        setFavourites(favsRes.data.favourites);
    } finally {
        setLoading(false);
    }
};
    useEffect(() => {
        const fetchUserId = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const decoded: any = jwtDecode(token as string);
                setUserId(decoded.id);
            }
        };
        fetchUserId();
    }, []);

    useEffect(() => {
        if (!userId) return;
        fetchListsAndFavourites();
    }, [userId]);
useFocusEffect(
    React.useCallback(() => {
        if (userId) {
            fetchListsAndFavourites();
        }
    }, [userId])
);

    const listsWithFavourites = lists.map(list => ({
        ...list,
        favourites: favourites.filter(fav => fav.listId === list.id)
    }));

    if (loading) {
        return <ActivityIndicator size="large" color="#000" style={{ flex: 1, justifyContent: "center" }} />;
    }

    return (
        <ScrollView>
            <View style={styles.Container}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('Explore', {
                            screen: 'CreateNewListScreen',
                            params: {
                                onListCreated: (newListId: string) => {
                                    if (onSelectList) onSelectList(newListId);
                                    if (userId) fetchListsAndFavourites();
                                }
                            }
                        })
                    }
                    style={styles.row}
                >
                    <View style={styles.icon}>
                        <FontAwesome5 name="plus" size={iconSize} color="white" />
                    </View>
                    <Text style={styles.title}>
                        Create New List
                    </Text>
                </TouchableOpacity>
            </View>
            {listsWithFavourites.map(list => (
                <View style={styles.Container} key={list.id}>
<TouchableOpacity
  onPress={() => {
    if (isModal && onSelectList) {
        onSelectList(list.id);
    } else {
  
   navigation.navigate('ViewFavouritesScreen', { favourites: list.favourites });

    }
  }}
  >
  <Text style={styles.favouriteTitle}>{list.listName || "Untitled List"}</Text>
  <Text style={styles.favouriteDescription}>{list.description || "No description"}</Text>
  <View style={styles.icon}>
    <FontAwesome5 name="bookmark" size={iconSize} color="green" />
  </View>
  <Text style={styles.subTitle}>{list.favourites.length} Favourites</Text>
</TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteList(list.id)} style={styles.deleteListIcon}>
                        <View style={styles.deleteListIcon}>
                            <FontAwesome5 name="trash" size={deleteIconSize} color="grey" />
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    Container: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: '#fff',
        paddingLeft: 10,
        borderBottomWidth: 2,
        borderBottomColor: "grey",
        paddingBottom: 35,
    },
    title: {
        position: "absolute",
        alignItems: "center",
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 80,
        marginTop: 20,
        justifyContent: "center",
        
    },
    deleteListIcon: {
        position: "absolute",
        right: 5,
        top: 9,
        width: width * 0.12,
        height: height * 0.04,
        alignItems: "center",
        justifyContent: "center"
    },
    favouriteTitle: {
        position: "absolute",
        fontSize: 30,
        marginBottom: 20,
        marginTop: 5,
        marginLeft: 80,
        color: "green",
        fontWeight: 'condensed',
        width: width * 0.7,

    },
    subTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20,
        marginTop: 30,
        marginLeft: 80,
        color: "green",
    },
    icon: {
        marginLeft: 10,
        margin: 10,
        backgroundColor: "grey",
        borderWidth: 0.5,
        width: width * 0.13,
        height: height * 0.063,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    favouriteDescription: {
        position: "absolute",
        fontSize: 20,
        marginBottom: 10,
        marginTop: 40,
        marginLeft: 80,
        height: height * 0.9,
        width: width * 0.7,
        paddingTop: 10,

    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default FavouritesScreen;