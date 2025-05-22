import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
const FontAwesome5 = require('react-native-vector-icons/FontAwesome5').default;
import { RootStackParamList } from "../types/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get('window');

const iconSize = 50;

interface FavouritesScreenProps {
    onSelectList?: (list: any) => void;
    isModal?: boolean;
}

const FavouritesScreen: React.FC<FavouritesScreenProps> = ({ onSelectList, isModal }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [userId, setUserId] = useState<string | null>(null);
    const [lists, setLists] = useState<any[]>([]);
    const [favourites, setFavourites] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newListName, setNewListName] = useState("");
    const [creating, setCreating] = useState(false);



    const fetchListsAndFavourites = async (uid: string) => {
    setLoading(true);
    try {
        const [listsRes, favsRes] = await Promise.all([
            axios.post("http://192.168.18.29:3000/api/fetchLists", { userId: uid }),
            axios.post("http://192.168.18.29:3000/api/fetchFavourites", { userId: uid })
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
    fetchListsAndFavourites(userId);
}, [userId]);

    
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
                if (userId) fetchListsAndFavourites(userId);
            }
        }
    })
}
                >
                    <View style={styles.icon}>
                        <FontAwesome5 name="plus" size={iconSize} color="white" />
                    </View>
                    <Text style={styles.title}>
                        Create New Favorites
                    </Text>
                </TouchableOpacity>
            </View>
            {listsWithFavourites.map(list => (
                <View style={styles.Container} key={list.id}>
                    <TouchableOpacity onPress={() => onSelectList && onSelectList(list.id)}>
    <Text style={styles.favouriteTitle}>{list.listName || "Untitled List"}</Text>
    <Text style={styles.favouriteDescription}>{list.description || "No description"}</Text>
    <View style={styles.icon}>
        <FontAwesome5 name="bookmark" size={iconSize} color="green" />
    </View>
    <Text style={styles.subTitle}>{list.favourites.length} Favourites</Text>
</TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
};

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
        fontWeight: '600',
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
        alignItems: "center",
        justifyContent: "center"
    },
    favouriteDescription: {
        position: "absolute",
        fontSize: 20,
        marginBottom: 20,
        marginTop: 70,
        marginLeft: 80,
    },
});

export default FavouritesScreen;