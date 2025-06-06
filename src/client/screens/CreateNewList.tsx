import React, { useState } from "react";
import { Text, View, TextInput, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation, NavigationProp, useRoute, RouteProp } from '@react-navigation/native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from 'jwt-decode';

const { height, width } = Dimensions.get('window');

const CreateNewListScreen = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute<RouteProp<any>>();
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedPrivacy, setSelectedPrivacy] = useState("Public");
    const [listName, setListName] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [userId, setUserId] = useState<string | null>(null);

    React.useEffect(() => {
        const fetchUserId = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const decoded: any = jwtDecode(token as string);
                setUserId(decoded.id);
            }
        };
        fetchUserId();
    }, []);

   const handleSelect = (option: string) => {
    const enumMap: Record<string, string> = {
        "Public": "Public",
        "Private": "Private",
        "Followers Only": "FollowersOnly"
    };
    setSelectedPrivacy(enumMap[option]);
    setShowDropdown(false);
};

   const handleSaveList = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.post('http://192.168.18.29:3000/api/createNewList', {
            listName,
            description,
            privateLevel: selectedPrivacy
        }, config);
    const newListId = response.data.id;
    if(route.params?.onListCreated){
        route.params.onListCreated(newListId);
    }
navigation.goBack();
} catch (errors: any) {
    console.error(errors);
            if (errors.response?.data?.errors) {
                const fieldErrors: { [key: string]: string } = {};
                errors.response.data.errors.forEach((err: { field: string; message: string }) => {
                    fieldErrors[err.field] = err.message;
                });
                setErrors(fieldErrors);
            } else if (errors.response?.data?.message) {
                setErrors({ general: errors.response.data.message });
            } else {
                setErrors({ general: 'An error occurred during sign in. Please try again.' });
            }
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.listNameInput}
                placeholder="List Name"
                value={listName}
                onChangeText={text => setListName(text)}
            />

            <TextInput
                style={styles.descriptionInput}
                placeholder="Description"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                value={description}
                onChangeText={text => setDescription(text)}
            />

            <View style={styles.dropdownWrapper}>
                <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)} style={styles.dropdownButton}>
                    <Text style={styles.dropdownText}>{selectedPrivacy}</Text>
                </TouchableOpacity>

                {showDropdown && (
                    <View style={styles.dropdownOptions}>
                        {["Public", "Private", "Followers Only"].map(option => (
                            <TouchableOpacity key={option} onPress={() => handleSelect(option)} style={styles.option}>
                                <Text>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveList}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    listNameInput: {
        marginTop: 50,
        fontSize: 18,
        width: width * 0.92,
        height: height * 0.07,
        borderWidth: 2,
        borderColor: "grey",
        paddingHorizontal: 10,
    },
    descriptionInput: {
        fontSize: 18,
        width: width * 0.92,
        height: height * 0.2,
        borderWidth: 2,
        borderColor: "grey",
        paddingHorizontal: 10,
        marginVertical: 20,
        textAlignVertical: "top",
    },
    dropdownWrapper: {
        width: width * 0.92,
    },
    dropdownButton: {
        borderWidth: 2,
        borderColor: "grey",
        padding: 12,
        borderRadius: 5,
    },
    dropdownText: {
        fontSize: 16,
    },
    dropdownOptions: {
        marginTop: 5,
        borderWidth: 2,
        borderColor: "grey",
        borderRadius: 5,
        backgroundColor: "#f9f9f9",
    },
    option: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    saveButton: {
        backgroundColor: "grey",
        width: width * 0.92,
        height: height * 0.06,
        marginTop: 30,
        borderRadius: 10,
        justifyContent: "center",
    },
    saveButtonText: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: "center",
        color: "#fff",
    },
});

export default CreateNewListScreen;
